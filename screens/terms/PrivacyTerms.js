import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const LI = ({ text }) => {
  return (
    <View style={styles.olContainer}>
      <Feather style={{ marginTop: 4 }} name="circle" size={8} color="black" />
      <Text style={styles.olText}>{text}</Text>
    </View>
  );
};

const LI2 = ({ text }) => {
  return (
    <View style={styles.ol2Container}>
      <Feather
        style={{ marginTop: 4 }}
        name="chevron-right"
        size={8}
        color="black"
      />
      <Text style={styles.ol2Text}>{text}</Text>
    </View>
  );
};

const PrivacyTerms = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>개인정보 처리방침</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.inner}>
          <Text style={styles.content}>1. 개인정보 처리방침</Text>
          <Text style={styles.content2}>
            개인정보 처리방침은 회사가 서비스를 제공함에 있어, 개인정보를 어떻게
            수집·이용·보관·파기하는지에 대한 정보를 담은 방침을 의미합니다.
            개인정보 처리방침은 개인정보보호법, 정보통신망 이용촉진 및 정보보호
            등에 관한 법률 등 국내 개인정보 보호 법령을 모두 준수하고 있습니다.
            이 약관의 정의는 서비스 이용약관을 따릅니다.
          </Text>
          <Text style={styles.content}>2. 수집하는 개인정보의 항목</Text>
          <Text style={styles.content2}>
            회사는 서비스 제공을 위해 아래 항목 중 최소한의 개인정보를
            수집합니다.
          </Text>
          <Text style={styles.content2}>1. 회원가입을 할 경우</Text>
          <LI
            text={`학교, 아이디, 이메일, 이름, 생년월일, 성별, 프로필 사진, 취미, 이상형, 본인 소개`}
          />
          <Text style={styles.content2}>2. 학교인증을 할 경우</Text>
          <LI text={`학교 웹메일 주소`} />
          <Text style={styles.content2}>3. 이벤트·행사 참여를 할 경우</Text>
          <LI text={`이름, 전화번호, 주소`} />
          <Text style={styles.content2}>4. 제휴·광고·게시 요청을 할 경우</Text>
          <LI
            text={`단체명, 대표자·담당자 정보(이름, 이메일, 전화번호, 직책)`}
          />
          <Text style={styles.content2}>5. 게시중단 요청을 할 경우</Text>
          <LI
            text={`요청인·대리인 정보(이름·단체명, 생년월일·설립일, 마스킹된 신분증 사본, 연락처, 이메일, 증빙 자료 사본)`}
          />
          <Text style={styles.content}>3. 수집한 개인정보의 이용</Text>
          <Text style={styles.content2}>
            회사는 쾌적한 서비스를 제공하기 위해, 아래의 목적에 한해 개인정보를
            이용합니다.
          </Text>
          <Text style={styles.content2}>
            1. 가입 및 탈퇴 의사 확인, 회원 식별 등 회원관리
          </Text>
          <Text style={styles.content2}>
            2. 서비스 제공 및 기존·신규 시스템 개발·유지·개선
          </Text>
          <Text style={styles.content2}>
            3. 불법·약관 위반 게시물 게시 등 부정행위 방지를 위한 운영 시스템
            개발·유지·개선
          </Text>
          <Text style={styles.content2}>
            4. 인구통계학적 자료 분석을 통한 맞춤형 콘텐츠 및 광고 제공
          </Text>
          <Text style={styles.content2}>
            5. 문의·제휴·광고·이벤트·게시 관련 요청 응대 및 처리
          </Text>
          <Text style={styles.content}>
            4. 개인정보의 제3자 제공 및 처리위탁
          </Text>
          <Text style={styles.content2}>
            회사는 관련법 및 훠원의 동의가 없는 한, 훠원의 개인정보를 제3자에게
            절대 제공하지 않습니다. 단, 회사는 보안성 높은 서비스 제공을 위하여,
            신뢰도가 검증된 아래 회사에 개인정보 관련업무 처리를 위탁할 수
            있습니다. 이 경우 회사는 훠원에게 위탁을 받는 자와 업무의 내용을
            사전에 알리고 동의를 받습니다, 위탁을 받는 자 또는 업무의 내용이
            변경될 경우에도 같습니다.
          </Text>
          <Text style={styles.content2}>
            회사는 정보통신 서비스의 제공에 관한 계약을 이행하고 회원의 편의
            증진 등을 위하여 추가적인 처리 위탁이 필요한 경우에는 고지 및 동의
            절차를 거치지 않을 수 있습니다.
          </Text>
          <Text style={styles.content2}>
            1. Amazon Web Service : 서비스 시스템 제공, 데이터 관리 및 보관
          </Text>
          <Text style={styles.content}>5. 수집한 개인정보의 보관 및 파기</Text>
          <Text style={styles.content2}>
            회사는 서비스를 제공하는 동안 개인정보 취급방침 및 관련법에 의거하여
            회원의 개인정보를 지속적으로 관리 및 보관합니다. 탈퇴 등으로 인해
            개인정보 수집 및 이용목적이 달성될 경우, 수집된 개인정보는 즉시 또는
            아래와 같이 일정 기간 이후 파기됩니다.
          </Text>
          <Text style={styles.content2}>
            1. 매칭 서비스 이용 내역 : 탈퇴 시 즉시 파기
          </Text>
          <Text style={styles.content2}>
            2. 가입 및 학교 인증 시 수집된 개인정보 등 개인 프로필 정보 : 탈퇴
            시 즉시 파기
          </Text>
          <Text style={styles.content2}>
            3. 게시요청 관리자 정보 : 마지막 접속일로부터 2년
          </Text>
          <Text style={styles.content2}>4. 이용자 문의 자료 : 3년</Text>
          <Text style={styles.content2}>5. 게시중단 요청 자료 : 3년</Text>
          <Text style={styles.content2}>
            ※ 위 항에도 불구하고 법령에 의해 개인정보를 보관할 경우, 해당
            법령에서 정한 최대 기간만큼 저장합니다.
          </Text>
          <Text style={styles.content2}>
            ※ 개인정보의 수집 및 이용 목적이 달성되지 않았을 경우, 개인정보 파기
            요청은 처리되지 않습니다.
          </Text>
          <Text style={styles.content2}>
            ※ 개인정보 파기는 복구가 불가능한 기술적 방법을 이용하므로, 파기된
            개인정보를 복원 할 수 없습니다.
          </Text>
          <Text style={styles.content2}>
            ※ 회원이 1년 이상 로그인 및 접속을 하지 않을 경우, 해당 계정은 휴면
            계정으로 전환됩니다. 휴면 계정이 로그인에 성공할 경우, 휴면 상태가
            즉시 해제되어 모든 서비스를 이용할 수 있습니다. 휴면 계정 전환
            이후에도 3년 간 로그인을 하지 않을 경우, 해당 계정은 영구
            삭제됩니다.
          </Text>
          <Text style={styles.content2}>
            ※ 학교 인증 시, 위조·도용 피해를 방지하기 위해 학교 웹메일 주소를
            사용자 데이터와 분리하여 1년간 보관합니다.
          </Text>
          <Text style={styles.content2}>
            ※ 부정행위 시, 제재를 위해 IP 주소 및 학교, 학교 웹메일 주소,
            연계정보를 최대 1년 간 보관합니다. 단, 커뮤니티 및 채팅 내역 유출,
            타 회원 정보 유출, 시스템 해킹, 학교 인증자료 위·변조, 계정
            탈취·판매 등의 중대한 부정행위로 서비스에 피해가 발생할 수 있다고
            판단될 경우, 추가 피해 방지를 위해 이를 5년 간 보관합니다.
          </Text>
          <Text style={styles.content}>6. 정보 주체의 권리, 의무 및 행사</Text>
          <Text style={styles.content2}>
            회원은 언제든지 [프로필 수정]을 통해 자신의 개인정보를 조회하거나
            수정, 삭제, 탈퇴를 할 수 있습니다.
          </Text>
          <Text style={styles.content}>7. 쿠키</Text>
          <Text style={styles.content2}>
            쿠키란 웹사이트를 운영하는 데 이용되는 서버가 귀하의 브라우저에
            보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에
            저장됩니다. 서비스는 사이트 로그인을 위해 아이디 식별에 쿠키를
            사용할 수 있습니다.
          </Text>
          <Text style={styles.content2}>쿠키 설정 거부 방법 예시</Text>
          <Text style={styles.content2}>
            {`1. Internet Explorer : 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 > 설정`}
          </Text>
          <Text style={styles.content2}>
            {`2. Chrome : 웹 브라우저 우측의 설정 > 고급 설정 표시 > 개인정보의 콘텐츠 설정 버튼 > 쿠키`}
          </Text>
          <Text style={styles.content}>
            8. 개인정보에 관한 책임자 및 서비스
          </Text>
          <Text style={styles.content2}>
            회사는 회원의 개인정보를 최선으로 보호하고 관련된 불만을 처리하기
            위해 권리침해신고센터를 운영하고 있습니다.
          </Text>
          <Text style={styles.content2}>
            권리침해신고센터 메일 : minsu0523@naver.com
          </Text>
          <Text style={styles.content2}>
            ※ 서비스 이용, 접근 제한 등의 문의는 권리침해신고센터를 통해
            처리되지 않습니다. 해당 문의는 [문의하기] 를 통해 전달해주시기
            바랍니다
          </Text>
          <Text style={styles.content2}>
            기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에
            문의하시기 바랍니다.
          </Text>
          <Text style={styles.content2}>
            1. 개인분쟁조정위원회 (www.1336.or.kr / 1336)
          </Text>
          <Text style={styles.content2}>
            2. 정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)
          </Text>
          <Text style={styles.content2}>
            3. 대검찰청 인터넷범죄수사센터 (icic.sppo.go.kr / 02-3480-3600)
          </Text>
          <Text style={styles.content2}>
            4. 경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)
          </Text>
          <Text style={styles.content}>9. 기타</Text>
          <Text style={styles.content2}>
            이 약관은 2022년 6월 4일에 최신화 되었습니다.
          </Text>
          <Text style={styles.content2}>
            본 약관의 내용 추가 삭제 및 수정이 있을 경우 개정 최소 7일 전에
            ‘공지사항'을 통해 사전 공지를 할 것입니다. 다만, 수집하는 개인정보의
            항목, 이용 목적의 변경 등과 같이 회원 관리의 중대한 변경이 발생할
            때에는 최소 30일 전에 공지하거나, 동의를 다시 받도록 하겠습니다.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyTerms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    position: "relative",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  titleContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    width: "100%",
    zIndex: -1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  inner: {
    padding: 20,
    paddingBottom: 4,
  },
  list: {
    paddingVertical: 10,
  },
  title2: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  content: {
    paddingLeft: 4,
    marginBottom: 8,
    fontWeight: "600",
  },
  content2: {
    paddingLeft: 12,
    marginBottom: 8,
  },
  olContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 8,
    marginLeft: 16,
    marginBottom: 8,
  },
  olText: {
    marginLeft: 4,
  },
  ol2Container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 8,
    marginLeft: 20,
    marginBottom: 4,
  },
  ol2Text: {
    marginLeft: 4,
  },
});
