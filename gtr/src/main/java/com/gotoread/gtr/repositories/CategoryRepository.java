package com.gotoread.gtr.repositories;
import com.gotoread.gtr.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
