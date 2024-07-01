package com.gotoread.gtr.controllers;

import com.gotoread.gtr.dto.CreateCategoryDto;
import com.gotoread.gtr.models.Category;
import com.gotoread.gtr.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/gtr")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    private final CategoryService categoryService;
    @GetMapping("/library")
    public ResponseEntity<List<Category>> getCategories() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        List<Category> categories = categoryService.getCategoriesByUser(username);
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/library")
    public ResponseEntity<Category> createCategory(@RequestBody CreateCategoryDto createCategoryDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Category category = categoryService.createCategory(username, createCategoryDto);
        return ResponseEntity.ok(category);
    }
}
