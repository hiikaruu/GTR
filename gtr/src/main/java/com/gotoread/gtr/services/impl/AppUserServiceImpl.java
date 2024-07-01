package com.gotoread.gtr.services.impl;

import com.gotoread.gtr.repositories.AppUserRepository;
import com.gotoread.gtr.services.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService {
    private final AppUserRepository appUserRepository;
    @Override
    public Long findUserIdByUsername(String username) {
        return appUserRepository.findUserIdByUsername(username);
    }

}
