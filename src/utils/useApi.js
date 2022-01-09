import axios from 'axios';

import config from '../config/app/app-config-APP_TARGET';

export default () => {

    const instance = axios.create({
        baseURL: config.apiUrl
    });

    const get = ({path, params, id=null}) => {
        if (!path) return
        return instance.get(`/${path}${id ? '/'+id : ''}`, {params})
            .then(({data}) => {
                return data;
            })
    }

    const create = () =>{

    }

    const update = () => {

    }

    const remove = () => {

    }

    return {
        get, create, update, remove
    }
}