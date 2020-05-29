import styled from 'styled-components';

const Form = styled.div`
  padding: 5px;
`;

const VerticalLayout = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
`;

const HorizontalLayout = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
`;

const Page = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
`;

const Header = styled.header`
  box-sizing: border-box;
  height: auto;
  width: 100%;
`;

const Content = styled.section`
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  -ms-flex-positive: 1;
      flex-grow: 1;
`;

const Footer = styled.footer`
  box-sizing: border-box;
  height: auto;
  width: 100%;
`;

export { Page, Content, Form, Header, Footer, VerticalLayout, HorizontalLayout }