package com.gotoread.gtr.controllers;

import com.gotoread.gtr.dto.CreateCategoryDto;
import com.gotoread.gtr.models.Category;
import com.gotoread.gtr.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/gtr")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping("/library")
    public ResponseEntity<Category> createCategory(@RequestBody CreateCategoryDto createCategoryDto) throws IOException {
        return ResponseEntity.ok(categoryService.createCategory(createCategoryDto));
    }
}
