import styled from "styled-components/native";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import { firstTerm, secondTerm, thirdTerm } from "../../common/TermsOfUseDetailData";

const ViewContainer = styled.View`
  height: 100%;
  width: 100%;
`;

const DetailScrollView = styled.ScrollView`
  width: 100%;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 15px 15px 0px 0px;
`;

const AgreeBtn = styled.Pressable`
  justify-content: center;
  align-items: center;
  margin-top: 11px;
  width: 100%;
  height: 45px;
  border-radius: 10px;
  background-color: ${colors.Primary_100};
`;

const AgreeBtnText = styled(fonts.Body1)`
  color: ${colors.Grayscale_100};
`;

function TermsOfUseDetail({index, onBack}) {
  const transformer = (x) => {
    switch (x) {
      case 0 :
        return firstTerm();
      case 1 :
        return secondTerm();
      case 2 :
        return secondTerm();
      case 3 : 
        return thirdTerm();
    }
  }

  return (
    <ViewContainer>
      <DetailScrollView>{transformer(index)}</DetailScrollView>
      <AgreeBtn onPress={onBack}>
        <AgreeBtnText>동의하기</AgreeBtnText>
      </AgreeBtn>
    </ViewContainer>
  );
}

export default TermsOfUseDetail;
