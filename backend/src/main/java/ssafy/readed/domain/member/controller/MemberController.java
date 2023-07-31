package ssafy.readed.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.member.controller.dto.MemberProfileModifyRequestDto;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.service.MemberService;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto requestDto) {
        memberService.signUp(requestDto);
        return JsonResponse.ok("회원가입 성공!");
    }

    @GetMapping("/profile/{member-id}")
    private ResponseEntity<?> selectProfile(@PathVariable("member-id") Long id) {
        return JsonResponse.ok("멤버 프로필 조회 성공!", memberService.selectProfile(id));
    }

    @PatchMapping("/profile/{member-id}")
    private ResponseEntity<?> modifyProfile(@PathVariable("member-id") Long id,
            @RequestBody MemberProfileModifyRequestDto requestDto) {
        memberService.modifyProfile(id, requestDto);
        return JsonResponse.ok("멤버 프로필 변경 성공!");
    }
}
