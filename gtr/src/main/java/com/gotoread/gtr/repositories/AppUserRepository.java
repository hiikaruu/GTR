package com.gotoread.gtr.repositories;

import com.gotoread.gtr.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    AppUser findByUsername(String username);
    boolean existsByEmail(String email);
    Long findUserIdByUsername(String username);
}
