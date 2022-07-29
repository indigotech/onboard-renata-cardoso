import styled from 'styled-components/native';

export const H1 = styled.Text`
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
`;

export const AddUserRadioButtonsWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const AddUserTextRadioButtons = styled.Text`
  font-size: 14px;
  color: #000;
  margin-top: 4px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const LoginInputWrapper = styled.View`
  margin-top: 32px;
`;

export const UserListContainer = styled.View`
  padding: 8px;
  margin: 2px;
  border: 1px solid #c4c4c4;
  background-color: #fff;
`;

export const UserListText = styled.Text`
  font-size: 16px;
`;

export const UserListProfileButton = styled.TouchableOpacity`
  background-color: #fff;
  width: 50px;
  align-self: flex-end;
`;

export const UserListProfileText = styled.Text`
  color: #6550ff;
  text-align: center;
`;

export const UserDetailsInfoWrapper = styled.View`
  padding: 8px;
  margin-top: 8px;
`;

export const UserDetailsInfoText = styled.Text`
  color: #000000;
  font-size: 16px
  background-color: #e9e9e9;
  padding: 8px 12px 8px 12px;
  margin-top: 2px;
`;

export const TextError = styled.Text`
  color: #FF0000;
  font-size: 14px
  margin-top: 14px;
`;

export const Container = styled.View`
  align-items: center;
`;
