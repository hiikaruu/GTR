package com.gotoread.gtr.services.impl;

import com.gotoread.gtr.models.AppUser;
import com.gotoread.gtr.repositories.AppUserRepository;
import com.gotoread.gtr.services.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService {
    private final AppUserRepository appUserRepository;
    @Override
    public AppUser findUserByUsername(String username) {
        AppUser appUser = appUserRepository.findByUsername(username);
        if (appUser != null) {
            return appUser;
        } else {
            throw new RuntimeException("User not found for username: " + username);
        }
    }
}
