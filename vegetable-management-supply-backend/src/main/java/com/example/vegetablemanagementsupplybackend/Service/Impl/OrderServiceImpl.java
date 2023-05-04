package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Converter.OrderConverter;
import com.example.vegetablemanagementsupplybackend.DTO.OrderDto;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.ChangeStatusResponse;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.OrderResponse;
import com.example.vegetablemanagementsupplybackend.Entity.Mart;
import com.example.vegetablemanagementsupplybackend.Entity.Order;
import com.example.vegetablemanagementsupplybackend.Entity.OrderItem;
import com.example.vegetablemanagementsupplybackend.Enum.OrderStatusEnum;
import com.example.vegetablemanagementsupplybackend.Exception.ResourceNotFoundException;
import com.example.vegetablemanagementsupplybackend.Repository.MartRepository;
import com.example.vegetablemanagementsupplybackend.Repository.OrderItemRepository;
import com.example.vegetablemanagementsupplybackend.Repository.OrderRepository;
import com.example.vegetablemanagementsupplybackend.Service.OrderService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private MartRepository martRepository;
    private OrderConverter converter;

    @Override
    public OrderDto createOrder(String martId, OrderDto orderDto) {
        Mart mart = this.martRepository.findById(martId)
                .orElseThrow(() -> new ResourceNotFoundException("Mart", "Id", martId));
        Order order = converter.dtoToOrder(orderDto);
        order.setOrderDate(Date.from(Instant.now()));
        order.setMart(mart);
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
        }
        return converter.orderToDto(savedOrder);
    }

    @Override
    public ChangeStatusResponse rejectOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "Id", orderId));
        OrderStatusEnum orderStatusEnum = order.getOrderStatus();
        if(orderStatusEnum.equals(OrderStatusEnum.WAIT_RESOLVE)) {
            order.setOrderStatus(OrderStatusEnum.REJECT);
            return new ChangeStatusResponse("success",
                    orderStatusEnum.name(), order.getOrderStatus().name());
        }
        return new ChangeStatusResponse("failed",
                orderStatusEnum.name(), order.getOrderStatus().name());
    }

    @Override
    public ChangeStatusResponse cancelOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "Id", orderId));
        OrderStatusEnum orderStatusEnum = order.getOrderStatus();
        if(orderStatusEnum.equals(OrderStatusEnum.WAIT_RESOLVE)) {
            order.setOrderStatus(OrderStatusEnum.CANCEL);
            return new ChangeStatusResponse("success",
                    orderStatusEnum.name(), order.getOrderStatus().name());
        }
        return new ChangeStatusResponse("failed",
                orderStatusEnum.name(), order.getOrderStatus().name());
    }

    @Override
    public OrderDto updateOrder(String orderId) {

        return null;
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
        orderResponse.setOrderDtoList(orderDtoList);
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
        orderResponse.setOrderDtoList(orderDtoList);
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
        orderResponse.setOrderDtoList(orderDtoList);
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
        orderResponse.setOrderDtoList(orderDtoList);
        orderResponse.setPageNumber(pageNumber);
        orderResponse.setPageSize(pageSize);
        orderResponse.setTotalPages(orderPage.getTotalPages());
        orderResponse.setTotalElements(orderPage.getTotalElements());
        orderResponse.setLastPage(orderPage.isLast());
        return orderResponse;
    }
}
