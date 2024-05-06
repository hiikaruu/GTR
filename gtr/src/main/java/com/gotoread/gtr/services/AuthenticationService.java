package com.gotoread.gtr.services;

import com.gotoread.gtr.component.AuthenticationResponse;
import com.gotoread.gtr.exception.EmailAlreadyExistsException;
import com.gotoread.gtr.models.AppUser;
import com.gotoread.gtr.models.AppUserRole;
import com.gotoread.gtr.dto.AppUserAuthenticationDto;
import com.gotoread.gtr.dto.AppUserRegistrationDto;
import com.gotoread.gtr.repositories.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private  final JwtService jwtService;
    private  final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(AppUserRegistrationDto request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email address is already in use");
        }

        var user = AppUser.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .appUserRole(AppUserRole.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AppUserAuthenticationDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


}
