package com.gotoread.gtr.services.impl;

import com.gotoread.gtr.dto.CreateCategoryDto;
import com.gotoread.gtr.models.Category;
import com.gotoread.gtr.repositories.CategoryRepository;
import com.gotoread.gtr.services.AppUserService;
import com.gotoread.gtr.services.AuthenticationService;
import com.gotoread.gtr.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl  implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final AppUserServiceImpl appUserServiceImpl;

    @Override
    public Category createCategory(CreateCategoryDto createCategoryDto) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // Проверяем, аутентифицирован ли пользователь
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("User is not authenticated");
        }
        String currentUsername = authentication.getName();

        Category category = new Category();
        category.setName(createCategoryDto.getName());
        category.setUser(appUserServiceImpl.findUserByUsername(currentUsername));
        return categoryRepository.save(category);
    }
}
