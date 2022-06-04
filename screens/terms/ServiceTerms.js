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

const OL = ({ text }) => {
  return (
    <View style={styles.olContainer}>
      <Feather style={{ marginTop: 4 }} name="circle" size={8} color="black" />
      <Text style={styles.olText}>{text}</Text>
    </View>
  );
};

const OL2 = ({ text }) => {
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

const ServiceTerms = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>서비스 이용약관</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.inner}>
          <Text style={styles.title2}>{"제1조(목적)"}</Text>
          <Text style={styles.content}>
            캠퍼스데이트 서비스 이용약관은 회사가 서비스를 제공함에 있어, 회사와
            이용자 간의 권리, 의무 및 책임 사항 등을 규정함을 목적으로 합니다.
          </Text>
          <Text style={styles.title2}>{"제2조(정의)"}</Text>
          <Text style={styles.content}>
            1. 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </Text>
          <OL text={"“회사”란, 서비스를 제공하는 주체를 말합니다."} />
          <OL text="“서비스”란, 회사가 제공하는 모든 서비스 및 기능을 말합니다." />
          <OL
            text={`“이용자"란, 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.`}
          />
          <OL
            text={`“회원"이란, 서비스에 회원등록을 하고 서비스를 이용하는 자를 말합니다.`}
          />
          <OL
            text={`“비회원"이란, 서비스에 회원등록을 하지 않고 서비스를 이용하는 자를 말합니다.`}
          />
          <OL
            text={`“게시물"이란, 서비스에 게제된 문자, 사진을 포함해 회원 프로필에 게제된 정보 등을 말합니다.`}
          />
          <OL
            text={`“계정”이란, 이용계약을 통해 생성된 회원의 고유 아이디와 이에 수반하는 정보를 말합니다.`}
          />
          <OL
            text={`“서비스 내부 알림 수단"이란, 푸시 알림, 1:1 채팅, 알림, 공지사항 등을 말합니다.`}
          />
          <OL
            text={`“관련법"이란, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법, 통신비밀보호법 등 관련 있는 국내 법령을 말합니다.`}
          />
          <OL
            text={`“본인 인증”이란, 이메일 등을 이용한 본인 확인 절차를 말합니다.`}
          />
          <OL
            text={`“학교 인증”이란, 학교 웹메일을 이용한 학적 확인 절차를 말합니다.`}
          />
          <Text style={styles.content}>
            2. 1항에서 정의되지 않은 약관 내 용어의 의미는 일반적인 이용관행에
            의합니다.
          </Text>
          <Text style={styles.title2}>
            {"제3조(약관 등의 명시와 설명 및 개정)"}
          </Text>
          <Text style={styles.content}>
            1. 회사는 이 약관을 회원가입 화면 및 “설정" 메뉴 등에 게시합니다.
          </Text>
          <Text style={styles.content}>
            2. 회사는 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수
            있습니다.
          </Text>
          <Text style={styles.content}>
            3. 개정 내용이 회원에게 불리할 경우, 적용일자 및 개정사유를 명시하여
            현행약관과 함께 “공지사항"에 게시합니다.
          </Text>
          <Text style={styles.content}>
            4. 회원이 개정약관의 적용에 동의하지 않는 경우, 이용계약을
            해지함으로써 거부 의사를 표현할 수 있습니다. 단, 30일 내에 거부
            의사를 표현하지 않을 경우 약관에 동의한 것으로 간주합니다.
          </Text>
          <Text style={styles.content}>
            5. 회원은 약관의 일부만을 동의 또는 거부할 수 없습니다.
          </Text>
          <Text style={styles.content}>
            6. 비회원이 서비스를 이용할 경우, 이 약관에 동의한 것으로
            간주합니다.
          </Text>
          <Text style={styles.title2}>{"제4조(서비스의 제공)"}</Text>
          <Text style={styles.content}>
            1. 회사는 다음 서비스를 제공합니다.
          </Text>
          <OL text={`같은 대학 내 이성 매칭 서비스`} />
          <OL text={`“매력 어필", “후기" 등의 커뮤니티 서비스`} />
          <OL text={`할인, 이벤트, 프로모션, 광고 정보 제공 서비스`} />
          <OL text={`기타 회사가 정하는 서비스`} />
          <Text style={styles.content}>
            2. 회사는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할
            수 있습니다.
          </Text>
          <Text style={styles.content}>
            3. 회사는 이용자의 개인정보 및 서비스 이용 기록에 따라 서비스 이용에
            차이를 둘 수 있습니다.
          </Text>
          <Text style={styles.content}>
            4. 회사는 천재지변, 인터넷 장애, 경영 악화 등으로 인해 서비스를 더
            이상 제공하기 어려울 경우, 서비스를 통보 없이 중단할 수 있습니다.
          </Text>
          <Text style={styles.content}>
            5. 회사는 1항부터 전항까지와 다음 내용으로 인해 발생한 피해에 대해
            어떠한 책임을 지지 않습니다.
          </Text>
          <OL
            text={`모든 서비스, 게시물, 이용 기록의 진본성, 무결성, 신뢰성, 이용가능성`}
          />
          <OL text={`서비스 이용 중 타인과 상호 간에 합의한 내용`} />
          <OL
            text={`게시물, 광고의 버튼, 하이퍼링크 등 외부로 연결된 서비스와 같이 회사가 제공하지 않은 서비스에서 발생한 피해`}
          />
          <OL
            text={`이용자의 귀책사유 또는 회사의 귀책 사유가 아닌 사유로 발생한 이용자의 피해`}
          />
          <Text style={styles.title2}>{"제5조(서비스 이용계약의 성립)"}</Text>
          <Text style={styles.content}>
            1. 캠퍼스데이트는 대학교 웹메일이 유효한지 아닌지를 검증하여
            대학생으로 인증된 이용자에 한해 이용할 수 있는 소개팅 서비스입니다.
            해당 대학교의 학생이 아닌 이용자와 만 18세 미만의 이용자는 서비스를
            이용하거나 회원가입을 할 수 없으며, 그럼에도 불구하고 성립된
            회원가입은 무효로 간주합니다.
          </Text>
          <Text style={styles.content}>
            2. 회사와 회원의 서비스 이용계약은 서비스 내부의 회원가입 화면의
            가입 양식에 따라 회원정보를 기입한 후 필수 약관에 동의한다는
            의사표시를 한 비회원의 이용신청에 대하여, 서비스 화면에 이용승낙을
            표시하는 방법 등으로 의사표시를 하면서 체결됩니다.
          </Text>
          <Text style={styles.content}>
            3. 회사는 부정사용방지 및 본인확인을 위해 회원에게 본인 인증 및 학교
            인증을 요청할 수 있습니다.
          </Text>
          <Text style={styles.title2}>{"제6조(개인정보의 관리 및 보호)"}</Text>
          <Text style={styles.content}>
            1. 회원이 회사와 체결한 서비스 이용계약은 처음 이용계약을 체결한
            본인에 한해 적용됩니다.
          </Text>
          <Text style={styles.content}>
            2. 회원은 회원가입 시 등록한 정보에 변동이 있을 경우, 즉시 “설정"의
            "프로필 설정" 메뉴 등을 이용하여 정보를 최신화해야 합니다.
          </Text>
          <Text style={styles.content}>
            3. 회원의 아이디, 비밀번호, 이메일, 대학생 정보 등 모든 개인정보의
            관리책임은 본인에게 있으므로, 타인에게 양도 및 대여할 수 없으며,
            유출되지 않도록 관리해야 합니다. 만약 본인의 아이디 및 비밀번호를
            타인이 사용하고 있음을 인지했을 경우 바로 서비스 내부의 문의 창구에
            알려야 하고, 안내가 있는 경우 이에 즉시 따라야 합니다.
          </Text>
          <Text style={styles.content}>
            4. 회사는 2항부터 전항까지를 이행하지 않아 발생한 피해에 대해 어떠한
            책임을 지지 않습니다.
          </Text>
          <Text style={styles.title2}>{"제7조(서비스 이용계약의 종료)"}</Text>
          <Text style={styles.content}>
            1. 회원은 언제든지 본인의 계정으로 로그인한 뒤 서비스 내부의
            "탈퇴하기" 버튼을 누르는 방법으로 탈퇴를 요청할 수 있으며, 문의
            창구를 통한 탈퇴 요청 등은 처리되지 않습니다. 회사는 해당 요청을
            확인한 후 탈퇴를 처리합니다.
          </Text>
          <Text style={styles.content}>
            2. 탈퇴 처리가 완료 되었더라도, 회원이 게시한 게시물은 삭제되지
            않습니다.
          </Text>
          <Text style={styles.content}>
            3. 회사는 회원이 연속하여 1년 동안 로그인을 하지 않을 경우, 회원의
            동의 없이 회원자격을 박탈할 수 있습니다.
          </Text>
          <Text style={styles.content}>
            4. 회사는 천재지변, 테러, 폐교 등 불가피한 사유로 더 이상 서비스를
            제공할 수 없을 경우, 회원의 동의 없이 회원자격을 박탈할 수 있습니다.
          </Text>
          <Text style={styles.content}>
            5. 회사는 1항부터 전항까지로 인해 발생한 피해에 대해 어떠한 책임을
            지지 않습니다.
          </Text>
          <Text style={styles.title2}>{"제8조(회원에 대한 통보)"}</Text>
          <Text style={styles.content}>
            1. 회사가 회원에 대한 통보를 하는 경우, 서비스 내부 알림 수단과
            회원의 연락처를 이용합니다.
          </Text>
          <Text style={styles.content}>
            2. 회사는 다수의 회원에 대한 통보를 할 경우 공지사항 등에
            게시함으로써 개별 통보에 갈음할 수 있습니다.
          </Text>
          <Text style={styles.content}>
            3. 회원이 30일 이내에 의사 표시를 하지 않을 경우, 통보 내용에 대해
            동의한 것으로 간주합니다.
          </Text>
          <Text style={styles.title2}>{"제9조(저작권의 귀속)"}</Text>
          <Text style={styles.content}>
            1. 회사는 유용하고 편리한 서비스를 제공하기 위해, 2022년부터 서비스
            및 서비스 내부의 기능(매칭하기, 내 연인 찾기, 후기 등)의 체계와
            다양한 기능(매칭 알고리즘, 검색 기능 등)을 직접 설계 및 운영하고
            있는 데이터베이스 제작자에 해당합니다. 회사는 저작권법에 따라
            데이터베이스 제작자는 복제권 및 전송권을 포함한 데이터베이스 전부에
            대한 권리를 가지고 있으며, 이는 법률에 따라 보호를 받는 대상입니다.
            그러므로 이용자는 데이터베이스 제작자인 회사의 승인 없이
            데이터베이스의 전부 또는 일부를 복제·배포·방송 또는 전송할 수
            없습니다.
          </Text>
          <Text style={styles.content}>
            2. 회사가 작성한 게시물에 대한 권리는 회사에게 귀속되며, 회원이
            작성한 게시물에 대한 권리는 회원에게 귀속됩니다. 단, 회사는 서비스의
            운영, 확장, 홍보 등의 필요한 목적으로 회원의 저작물을 합리적이고
            필요한 범위 내에서 별도의 허락 없이 수정하여 무상으로 사용하거나
            제휴사에게 제공할 수 있습니다. 이 경우, 회원의 개인정보는 제공하지
            않습니다. 다만, 사진의 경우 모자이크 내지 블러처리, 이름의 경우
            성(金)만 표기 하고 나머지는 *로 가려 처리한 후 일부 개인정보를
            제공할 수도 있습니다.
          </Text>
          <Text style={styles.content}>
            3. 회사는 전항 이외의 방법으로 회원의 게시물을 이용할 경우, 서비스
            내부 알림 수단과 회원의 연락처를 이용하여 회원의 동의를 받아야
            합니다.
          </Text>
          <Text style={styles.title2}>{"제10조(게시물의 게시 중단)"}</Text>
          <Text style={styles.content}>
            1. 회사는 관련법에 의거하여 회원의 게시물로 인한 법률상 이익 침해를
            근거로, 다른 이용자 또는 제3자가 회원 또는 회사를 대상으로 하여
            민형사상의 법적 조치를 취하거나 관련된 게시물의 게시중단을 요청하는
            경우, 회사는 해당 게시물에 대한 접근을 잠정적으로 제한하거나 삭제할
            수 있습니다.
          </Text>
          <Text style={styles.title2}>{"제11조(광고의 게제 및 발신)"}</Text>
          <Text style={styles.content}>
            1. 회사는 서비스의 제공을 위해 서비스 내부에 광고를 게재할 수
            있습니다.
          </Text>
          <Text style={styles.content}>
            2. 회사는 이용자의 이용 기록을 활용한 광고를 게재할 수 있습니다.
          </Text>
          <Text style={styles.content}>
            3. 회사는 회원이 광고성 정보 수신에 동의할 경우, 서비스 내부 알림
            수단과 회원의 연락처를 이용하여 광고성 정보를 발신할 수 있습니다.
          </Text>
          <Text style={styles.content}>
            4. 회사는 광고 게재 및 동의된 광고성 정보의 발신으로 인해 발생한
            피해에 대해 어떠한 책임을 지지 않습니다.
          </Text>
          <Text style={styles.title2}>{"제12조(금지행위)"}</Text>
          <Text style={styles.content}>
            1. 이용자는 다음과 같은 행위를 해서는 안됩니다.
          </Text>
          <OL text={`개인정보 또는 계정 기만, 침해, 공유 행위`} />
          <OL2 text={`개인정보를 허위, 누락, 오기, 도용하여 작성하는 행위`} />
          <OL2
            text={`타인의 개인정보 및 계정을 수집, 저장, 공개, 이용하는 행위`}
          />
          <OL2
            text={`자신과 타인의 개인정보를 제3자에게 공개, 양도하는 행위`}
          />
          <OL2 text={`다중 계정을 생성 및 이용하는 행위`} />
          <OL2 text={`자신의 계정을 이용하여 타인의 요청을 이행하는 행위`} />
          <OL text={`시스템 부정행위`} />
          <OL2
            text={`해당 대학교의 학부 재학생 및 졸업생이 아닌 이용자가 서비스를 이용하는 행위`}
          />
          <OL2 text={`허가하지 않은 방식의 서비스 이용 행위`} />
          <OL2 text={`회사의 모든 재산에 대한 침해 행위`} />
          <OL text={`업무 방해 행위`} />
          <OL2
            text={`서비스 관리자 또는 이에 준하는 자격을 사칭하거나 허가없이 취득하여 직권을 행사하는 행위`}
          />
          <OL2
            text={`회사 및 타인의 명예를 손상시키거나 업무를 방해하는 행위`}
          />
          <OL2
            text={`서비스 내부 정보 일체를 허가 없이 이용, 변조, 삭제 및 외부로 유출하는 행위`}
          />
          <Text style={styles.content}>
            2. 이용자가 1항에 해당하는 행위를 할 경우, 회사는 다음과 같은 조치를
            영구적으로 취할 수 있습니다.
          </Text>
          <Text style={styles.content}>
            3. 회사는 1항부터 전항까지로 인해 발생한 피해에 대해 어떠한 책임을
            지지 않으며, 이용자는 귀책사유로 인해 발생한 모든 손해를 배상할
            책임이 있습니다.
          </Text>
          <Text style={styles.title2}>{"제13조(재판권 및 준거법)"}</Text>
          <Text style={styles.content}>
            1. 회사와 이용자 간에 발생한 분쟁에 관한 소송은 대한민국
            서울중앙지방법원을 관할 법원으로 합니다. 다만, 제소 당시 이용자의
            주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는
            민사소송법상의 관할법원에 제기합니다.
          </Text>
          <Text style={styles.content}>
            2. 회사와 이용자 간에 제기된 소송에는 한국법을 적용합니다.
          </Text>
          <Text style={styles.title2}>{"제14조(기타)"}</Text>
          <Text style={styles.content}>
            1. 이 약관은 2022년 6월 4일에 최신화되었습니다.
          </Text>
          <Text style={styles.content}>
            2. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관해서는 관련법
            또는 관례에 따릅니다.
          </Text>
          <Text style={styles.content}>
            이 약관에도 불구하고 다른 약관이나 서비스 이용 중 안내 문구 등으로
            달리 정함이 있는 경우에는 해당 내용을 우선으로 합니다.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceTerms;

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
  },
  olContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 8,
    marginBottom: 4,
  },
  olText: {
    marginLeft: 4,
  },
  ol2Container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 8,
    marginLeft: 12,
    marginBottom: 4,
  },
  ol2Text: {
    marginLeft: 4,
  },
});
