package com.gotoread.gtr.services;

import com.gotoread.gtr.dto.CreateCategoryDto;
import com.gotoread.gtr.models.Category;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface CategoryService {
    Category createCategory(CreateCategoryDto createCategoryDto) throws IOException;
}
