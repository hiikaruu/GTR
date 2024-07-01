package com.gotoread.gtr.services;

import com.gotoread.gtr.dto.CreateCategoryDto;
import com.gotoread.gtr.models.Category;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service

public interface CategoryService {
    List<Category> getCategoriesByUser(String username);

    Category createCategory(String username, CreateCategoryDto createCategoryDto);
}
