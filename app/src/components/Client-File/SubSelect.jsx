import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GET from '../../utils/GET';

export default function SubSelect() {
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            let response = await GET('categories');
            if (response.message === 'success') {
                setCategories(response.categories);
            }
        };
        fetchCategories();
    }, []);

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
            <Select native defaultValue="" id="grouped-native-select" label="Grouping">
                <option aria-label="None" value="" />
                {categories.map((category) => (
                    <optgroup key={category.id} label={category.name}>
                        {category.sub_categories.map((subCategory) => (
                            <option key={subCategory.id} value={subCategory.id}>
                                {subCategory.name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </Select>
        </FormControl>
    );
}
