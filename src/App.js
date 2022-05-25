import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import selector_query from "./api/selector_query";
import Select from "react-select";
import {TermSection} from "./components/TermSection";


function App() {
    const [list_category, set_list_category] = useState([]);
    const [sub_category_info_dict, set_sub_category_info_dict] = useState({});
    const [list_sub_category, set_list_sub_category] = useState([]);
    const [list_section, set_list_section] = useState([]);
    const [term_info_list, set_term_info_list] = useState([]);
    const [sub_cat_value, set_sub_cat] = useState(null);
    const [section_value, set_section] = useState(null);

    console.log(sub_cat_value);
    useEffect(() => {
        const fetch_list_category = () => {
            const params = {
                "request_type": "cat_info",
                "request_id": ""
            }
            selector_query.post('', params).then(result => {
                const res = result.data.data;
                let category_options = [];
                res.forEach(category => {
                    category_options.push({
                        "label": category.name,
                        "value": category.id
                    })
                })
                set_list_category(category_options);
            });
        };
        fetch_list_category();
    }, []);

    const set_category_selected = (value) => {
        const fetch_list_sub_category = () => {
            const params = {
                "request_type": "sub_cat_info",
                "request_id": value
            }
            selector_query.post('', params).then(result => {
                const res = result.data.data;
                let sub_category_options = [];
                let sub_category_arr = Object.keys(res);
                sub_category_arr.forEach(sub_category => {
                    sub_category_options.push({
                        "label": sub_category,
                        "value": sub_category
                    })
                })
                set_sub_category_info_dict(res);
                set_list_sub_category(sub_category_options);
            });
        };
        fetch_list_sub_category();
        set_sub_cat(null);
        set_section(null);
        set_term_info_list([]);
    };

    const set_sub_cat_selected = (e) => {
        let value = e.value;
        let list_section_options = [];
        sub_category_info_dict[value].forEach(section_info => {
            list_section_options.push({
                "label": section_info["section"],
                "value": section_info["sub_cat_id"]
            });
        })
        set_sub_cat({
            "value": value,
            "label": value
        });
        set_list_section(list_section_options);
        if (list_section_options.length === 1) {
            let default_option = {
                "value": list_section_options[0]['value'],
                "label": list_section_options[0]['label']
            }
            set_section(default_option);
            set_section_selected(default_option);
        } else {
            set_section(null);
            set_term_info_list([]);
        }
    }

    const set_section_selected = (e) => {
        let value = e.value;
        let label = e.label;
        const fetch_list_terms = () => {
            const params = {
                "request_type": "term_info",
                "request_id": value
            }
            selector_query.post('', params).then(result => {
                const res = result.data.data;
                set_term_info_list(res);
            })
        }
        set_section({
            'value': value,
            'label': label
        });
        fetch_list_terms();
    };

    return (
    <div className={'container'}>
        <div className={'label--cat'}>Select Category
            <Select
                placeholder={'Select category'}
                options={list_category}
                onChange={e => set_category_selected(e.value)}
            />
        </div>
        <div className={'label--sub-cat'}>Select Sub-Category
            <Select
                placeholder={'Select sub-category'}
                options={list_sub_category}
                value={sub_cat_value}
                onChange={e => set_sub_cat_selected(e)}
            />
        </div>
        <div className={'label--section'}>Select Section
            <Select
                placeholder={'Select section'}
                options={list_section}
                value={section_value}
                onChange={e => set_section_selected(e)}
            />
        </div>
        <div className={'label--term'}>
            <TermSection list_term_info={term_info_list} />
        </div>
    </div>
    );
}

export default App;