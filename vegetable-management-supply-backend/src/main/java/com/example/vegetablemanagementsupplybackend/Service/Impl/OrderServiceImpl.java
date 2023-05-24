package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Converter.OrderConverter;
import com.example.vegetablemanagementsupplybackend.DTO.OrderDto;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.ChangeStatusResponse;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.OrderResponse;
import com.example.vegetablemanagementsupplybackend.Entity.Mart;
import com.example.vegetablemanagementsupplybackend.Entity.Order;
import com.example.vegetablemanagementsupplybackend.Entity.OrderItem;
import com.example.vegetablemanagementsupplybackend.Entity.Provider;
import com.example.vegetablemanagementsupplybackend.Enum.OrderStatusEnum;
import com.example.vegetablemanagementsupplybackend.Exception.ResourceNotFoundException;
import com.example.vegetablemanagementsupplybackend.Repository.MartRepository;
import com.example.vegetablemanagementsupplybackend.Repository.OrderItemRepository;
import com.example.vegetablemanagementsupplybackend.Repository.OrderRepository;
import com.example.vegetablemanagementsupplybackend.Repository.ProviderRepository;
import com.example.vegetablemanagementsupplybackend.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private MartRepository martRepository;
    @Autowired
    private ProviderRepository providerRepository;
    private final OrderConverter converter;

    @Override
    public OrderDto createOrder(String martId, OrderDto orderDto) {
        Mart mart = this.martRepository.findById(martId)
                .orElseThrow(() -> new ResourceNotFoundException("Mart", "Id", martId));
        Order order = converter.dtoToOrder(orderDto);
        order.setOrderDate(Date.from(Instant.now()));
        order.setMart(mart);
        order.setOrderStatus(OrderStatusEnum.PENDING);
        Order savedOrder = this.orderRepository.save(order);
        List<OrderItem> orderItems = savedOrder.getOrderItems();
        if(orderItems.isEmpty() && orderItems != null) {
            for(OrderItem orderItem : orderItems) {
                int max_quantity = orderItem.getVegetable().getCurrentStock();
                if(max_quantity == 0) {
                    continue;
                } else if(max_quantity < orderItem.getQuantity()) {
                    orderItem.setQuantity(max_quantity);
                } else {
                    orderItem.setOrder(savedOrder);
                }
            }
            this.orderItemRepository.saveAll(orderItems);
        }
        return converter.orderToDto(savedOrder);
    }

    @Override
    public OrderDto resolveOrder(String orderId, OrderStatusEnum typeResolve) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "Id", orderId));
        OrderStatusEnum orderStatusEnum = order.getOrderStatus();
        if(orderStatusEnum.equals(OrderStatusEnum.PENDING)) {
            if(typeResolve.equals(OrderStatusEnum.RESOLVE)) {
                order.setOrderStatus(typeResolve);
                Order updatedOrder = this.orderRepository.save(order);
                return converter.orderToDto(updatedOrder);
            } else if(typeResolve.equals(OrderStatusEnum.REJECT)) {
                order.setOrderStatus(OrderStatusEnum.REJECT);
                Order updatedOrder = this.orderRepository.save(order);
                return converter.orderToDto(updatedOrder);
            }
        }
        return converter.orderToDto(order);
    }

    @Override
    public ChangeStatusResponse cancelOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "Id", orderId));
        OrderStatusEnum orderStatusEnum = order.getOrderStatus();
        if(orderStatusEnum.equals(OrderStatusEnum.PENDING) || orderStatusEnum.equals(OrderStatusEnum.RESOLVE)) {
            order.setOrderStatus(OrderStatusEnum.CANCEL);
            this.orderRepository.save(order);
            return new ChangeStatusResponse("success",
                    orderStatusEnum.name(), OrderStatusEnum.CANCEL.name());
        }
        return new ChangeStatusResponse("failed",
                orderStatusEnum.name(), OrderStatusEnum.CANCEL.name());
    }

    @Override
    public ChangeStatusResponse doneOrderByProvider(String providerId, String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "Id", orderId));
        Provider provider = this.providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "Id", providerId));
        OrderStatusEnum orderStatusEnum = order.getOrderStatus();
        if(orderStatusEnum.equals(OrderStatusEnum.RESOLVE)) {
            order.setOrderStatus(OrderStatusEnum.DONE);
            order.setReceiveBy(provider);
            this.orderRepository.save(order);
            return new ChangeStatusResponse("success",
                    orderStatusEnum.name(), OrderStatusEnum.DONE.name());
        }
        return new ChangeStatusResponse("failed",
                orderStatusEnum.name(), OrderStatusEnum.DONE.name());
    }

    @Override
    public OrderDto updateOrder(String orderId) {

        return null;
    }

    @Override
    public OrderDto getOrderById(String orderId) {
        Order order = this.orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "Id", orderId));
        return converter.orderToDto(order);
    }

    @Override
    public OrderResponse getAllOrder(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable page = PageRequest.of(pageNumber, pageSize, sort);
        Page<Order> orderPage = this.orderRepository.findAll(page);

        List<Order> orders = orderPage.getContent();
        List<OrderDto> orderDtoList = converter.ordersToDto(orders);

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setContent(orderDtoList);
        orderResponse.setPageNumber(pageNumber);
        orderResponse.setPageSize(pageSize);
        orderResponse.setTotalPages(orderPage.getTotalPages());
        orderResponse.setTotalElements(orderPage.getTotalElements());
        orderResponse.setLastPage(orderPage.isLast());
        return orderResponse;
    }

    @Override
    public OrderResponse filterOrderByStatus(
            OrderStatusEnum orderStatusEnum,
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable page = PageRequest.of(pageNumber, pageSize, sort);
        Page<Order> orderPage = this.orderRepository.filterOrderByStatus(orderStatusEnum, page);

        List<Order> orders = orderPage.getContent();
        List<OrderDto> orderDtoList = converter.ordersToDto(orders);

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setContent(orderDtoList);
        orderResponse.setPageNumber(pageNumber);
        orderResponse.setPageSize(pageSize);
        orderResponse.setTotalPages(orderPage.getTotalPages());
        orderResponse.setTotalElements(orderPage.getTotalElements());
        orderResponse.setLastPage(orderPage.isLast());
        return orderResponse;
    }

    @Override
    public OrderResponse getAllOrderOfMart(
            String martId,
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable page = PageRequest.of(pageNumber, pageSize, sort);
        Page<Order> orderPage = this.orderRepository.findByMart(martId, page);

        List<Order> orders = orderPage.getContent();
        List<OrderDto> orderDtoList = converter.ordersToDto(orders);

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setContent(orderDtoList);
        orderResponse.setPageNumber(pageNumber);
        orderResponse.setPageSize(pageSize);
        orderResponse.setTotalPages(orderPage.getTotalPages());
        orderResponse.setTotalElements(orderPage.getTotalElements());
        orderResponse.setLastPage(orderPage.isLast());
        return orderResponse;
    }

    @Override
    public OrderResponse filterOrderMartByStatus(
            String martId,
            OrderStatusEnum orderStatusEnum,
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable page = PageRequest.of(pageNumber, pageSize, sort);
        Page<Order> orderPage = this.orderRepository.findByMartAndStatus(martId, orderStatusEnum, page);

        List<Order> orders = orderPage.getContent();
        List<OrderDto> orderDtoList = converter.ordersToDto(orders);

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setContent(orderDtoList);
        orderResponse.setPageNumber(pageNumber);
        orderResponse.setPageSize(pageSize);
        orderResponse.setTotalPages(orderPage.getTotalPages());
        orderResponse.setTotalElements(orderPage.getTotalElements());
        orderResponse.setLastPage(orderPage.isLast());
        return orderResponse;
    }
}
