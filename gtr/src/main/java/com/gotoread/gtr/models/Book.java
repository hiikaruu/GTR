package com.gotoread.gtr.models;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "file_url", nullable = false)
    private String file_url;
    @Column(name = "authorship", nullable = false)
    private String authorship;
    @Column(name = "dop", nullable = true)
    private Date dop;
    @Column(name = "pages", nullable = false)
    private  Integer pages;

    public Book(String title, String fileUrl, String authorship, Date dop, Integer pages) {
        this.title = title;
        this.file_url = fileUrl;
        this.authorship = authorship;
        this.dop = dop;
        this.pages = pages;
    }
}
