package com.gotoread.gtr.dto;

import com.gotoread.gtr.models.AppUser;
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
    private String dop;
}