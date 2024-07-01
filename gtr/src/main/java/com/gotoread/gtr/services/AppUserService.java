package com.gotoread.gtr.services;

import com.gotoread.gtr.models.AppUser;
import org.springframework.stereotype.Service;

@Service
public interface AppUserService {
    Long findUserIdByUsername(String username);
}
