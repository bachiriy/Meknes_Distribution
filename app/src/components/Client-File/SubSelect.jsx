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
        const rtrn = async () => {
            let r = await GET('categories');
            if (r.message === 'success') {
                setCategories(r.categories);
            }
        }
        rtrn();
    }, []);

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
                <Select native defaultValue="" id="grouped-native-select" label="Grouping">
                    <option aria-label="None" value="" />

                    {categories.map((i) => (
                        <optgroup label={i.name}>
                            {i.sub_categories.map((j)=> (
                                <option value={j.id}>{j.name}</option>
                            ))}
                        </optgroup>

                    ))}

                </Select>
            </FormControl>
        </div>
    );
}
