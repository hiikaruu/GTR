package com.gotoread.gtr.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    @JsonBackReference
    private Category category;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "file_url", nullable = true)
    private String file_url;

    @Column(name = "authorship", nullable = false)
    private String authorship;

    @Column(name = "dop", nullable = true)
    private String dop;


    public Book(String title, String fileUrl, String authorship, String dop) {
        this.title = title;
        this.file_url = fileUrl;
        this.authorship = authorship;
        this.dop = dop;
    }
}
