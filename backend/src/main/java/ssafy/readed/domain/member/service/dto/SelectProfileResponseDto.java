package ssafy.readed.domain.member.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.readed.domain.member.entity.Member;

@Getter
@NoArgsConstructor
@ToString
public class SelectProfileResponseDto {

    private Long id;
    private String nickname;
    private String profile_bio;
    private String profile_image;

    private int readCount;
    private int reportCount;
    private int bookclubCount; // 북클럽 횟수
    private int pageCount; // 읽은 페이지 수
    private int star_0_count; // 별점 0점
    private int star_0p5_count; // 별점 0.5점
    private int star_1_count; // 별점 1점
    private int star_1p5_count; // 별점 1.5점
    private int star_2_count; // 별점 2점
    private int star_2p5_count; // 별점 2.5점
    private int star_3_count; // 별점 3점
    private int star_3p5_count; // 별점 3.5점
    private int star_4_count; // 별점 4점
    private int star_4p5_count; // 별점 4.5점
    private int star_5_count; // 별점 5점

    @Builder
    public SelectProfileResponseDto(Long id, String nickname, String profile_bio,
            String profile_image,
            int readCount, int reportCount, int bookclubCount, int pageCount) {
        this.id = id;
        this.nickname = nickname;
        this.profile_bio = profile_bio;
        this.profile_image = profile_image;
        this.readCount = readCount;
        this.reportCount = reportCount;
        this.bookclubCount = bookclubCount;
        this.pageCount = pageCount;
    }

    public static SelectProfileResponseDto from(Member member) {
        return SelectProfileResponseDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profile_bio(member.getProfile_bio())
                .profile_image(member.getProfile_image())
                .readCount(member.getReadCount())
                .reportCount(member.getReportCount())
                .bookclubCount(member.getBookclubCount())
                .pageCount(member.getPageCount())
                .build();
    }
}
