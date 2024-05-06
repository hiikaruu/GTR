package com.gotoread.gtr.controllers;

import com.gotoread.gtr.component.AuthenticationResponse;
import com.gotoread.gtr.dto.AppUserAuthenticationDto;
import com.gotoread.gtr.dto.AppUserRegistrationDto;
import com.gotoread.gtr.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AppUserRegistrationDto request){
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login (@RequestBody AppUserAuthenticationDto request){
        return ResponseEntity.ok(service.authenticate(request));

    }


}
