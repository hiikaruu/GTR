package com.gotoread.gtr.services.impl;

import com.gotoread.gtr.dto.CreateCategoryDto;
import com.gotoread.gtr.models.AppUser;
import com.gotoread.gtr.models.Category;
import com.gotoread.gtr.repositories.AppUserRepository;
import com.gotoread.gtr.repositories.CategoryRepository;
import com.gotoread.gtr.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl  implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final AppUserRepository appUserRepository;
    @Override
    public List<Category> getCategoriesByUser(String username) {
        AppUser user = appUserRepository.findByUsername(username);
        return categoryRepository.findByUser(user);
    }

    @Override
    public Category createCategory(String username, CreateCategoryDto createCategoryDto) {
        AppUser user = appUserRepository.findByUsername(username);
        Category category = new Category();
        category.setName(createCategoryDto.getName());
        category.setUser(user);
        return categoryRepository.save(category);
    }

}
