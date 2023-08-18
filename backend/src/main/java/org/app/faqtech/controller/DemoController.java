package org.app.faqtech.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/demo")
public class DemoController {

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String sayHello() {
        return "Hello from the other side!";
    }
}
