package com.gotoread.gtr.services;

import com.gotoread.gtr.models.AppUser;
import org.springframework.stereotype.Service;

@Service
public interface AppUserService {
    AppUser findUserByUsername(String username);
}
