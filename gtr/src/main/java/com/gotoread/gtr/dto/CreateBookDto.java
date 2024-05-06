package com.gotoread.gtr.dto;

import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookDto {
    private String title;
    private String file_url;
    private String authorship;
    private Date dop;
    private  Integer pages;
}