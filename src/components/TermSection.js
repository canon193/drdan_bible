import Faq from "react-faq-component";

const faq_styles = {
  bgColor: "white",
  titleTextColor: "black",
  titleTextAlign: "left",
  rowTitleColor: "Darkgreen",
  arrowColor: "Green"
};

export const TermSection = ({
  list_term_info
}) => {
  let list_concern = [];
  list_term_info.forEach(term_info => {
      let term_content = "";
      for (let index = 0; index < term_info.term_section_list.length; index++) {
        term_content += '<p><a href=' + term_info.url_list[index] + '>' + term_info.term_section_list[index] + '</a></p>';
      }
      list_concern.push({
        title: term_info.term_text,
        content: term_content
      })
  })
  let data = {
    title: "List concerns",
    rows: list_concern
  }
  return (
    <Faq data={data} styles={faq_styles} />
  );
};