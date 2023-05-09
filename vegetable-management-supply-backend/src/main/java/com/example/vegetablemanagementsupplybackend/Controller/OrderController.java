package com.example.vegetablemanagementsupplybackend.Controller;

import com.example.vegetablemanagementsupplybackend.Config.AppConstants;
import com.example.vegetablemanagementsupplybackend.DTO.OrderDto;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.ChangeStatusResponse;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.OrderResponse;
import com.example.vegetablemanagementsupplybackend.Enum.OrderStatusEnum;
import com.example.vegetablemanagementsupplybackend.Service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<OrderResponse> getAllOrder(
            @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir
    ) {
        OrderResponse response = this.orderService.getAllOrder(pageNumber, pageSize, sortBy, sortDir);
        if(response.getOrderDtoList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/")
    @Operation(
        summary = "Get list order by status",
        description = "Get list order by status PENDING, RESOLVE, REJECT, CANCEL, DONE",
        tags = {"Order"}
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Get list by status success",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class))
        ),
        @ApiResponse(responseCode = "204", description = "No data for this order status")
    })
    public ResponseEntity<OrderResponse> filterOrderByStatus(
            @RequestParam("status") OrderStatusEnum orderStatusEnum,
            @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir
    ) {
        OrderResponse response = this.orderService.filterOrderByStatus(orderStatusEnum, pageNumber, pageSize, sortBy, sortDir);
        if(response.getOrderDtoList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/mart")
    @Operation(
        summary = "Get All Order of Mart",
        description = "Mart request list ordered",
        tags = {"Order"}
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Get list ordered of mart success",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class))
        ),
        @ApiResponse(responseCode = "404", description = "Not found Mart with this ID")
    })
    public ResponseEntity<OrderResponse> getAllOrderOfMart(
            @RequestParam("martId") String martId,
            @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir
    ) {
        OrderResponse response = this.orderService.getAllOrderOfMart(martId, pageNumber, pageSize, sortBy, sortDir);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/mart/{martId}/status")
    @Operation(
            summary = "Get All Order By Status of Mart",
            description = "Mart request list ordered by status",
            tags = {"Order"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get list ordered bu status of mart success",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not found Mart with this ID"),
            @ApiResponse(responseCode = "204", description = "No data for this order status")
    })
    public ResponseEntity<OrderResponse> filterOrderMartByStatus(
            @PathVariable("martId") String martId,
            @RequestParam("status") OrderStatusEnum orderStatusEnum,
            @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir
    ) {
        OrderResponse response = this.orderService.filterOrderMartByStatus(martId, orderStatusEnum, pageNumber, pageSize, sortBy, sortDir);
        if(response.getOrderDtoList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<OrderDto> createOrder(
            @RequestParam(name = "martId") String martId,
            @RequestBody OrderDto orderDto
    ) {
        OrderDto createdOrder = this.orderService.createOrder(martId, orderDto);
        if(createdOrder == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }


    @PatchMapping("/{orderId}/reject")
    @Operation(
            summary = "Update Order Status",
            description = "Update order status change status from PENDING to REJECT",
            tags = {"Order"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success, status updated to REJECT",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class))
            ),
            @ApiResponse(responseCode = "404", description = "Order not found"),
    })
    public ResponseEntity<ChangeStatusResponse> rejectOrder(@PathVariable String orderId) {
        ChangeStatusResponse response = this.orderService.rejectOrder(orderId);
        if(response.getMessage().equals("failed")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{orderId}/cancel")
    @Operation(
            summary = "Update Order Status",
            description = "Update order status change status from PENDING to CANCEL",
            tags = {"Order"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success, status updated to CANCEL",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class))
            ),
            @ApiResponse(responseCode = "404", description = "Order not found"),
    })
    public ResponseEntity<ChangeStatusResponse> cancelOrder(@PathVariable String orderId) {
        ChangeStatusResponse response = this.orderService.cancelOrder(orderId);
        if(response.getMessage().equals("failed")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(response);
    }

}
