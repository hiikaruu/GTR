package com.gotoread.gtr.repositories;
import com.gotoread.gtr.models.AppUser;
import com.gotoread.gtr.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUser(AppUser user);
    Optional<Category> findByName(String name);
}
