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

    const create = ({path, data}) =>{
        if (!path || !data) return false
        return instance.post(`/${path}`, data)
            .then(({data}) => {
                return data;
            })
    }

    const update = ({path, id, data}) => {
        if (!path || !id || !data) return false
        return instance.put(`/${path}`, data)
            .then(({data}) => {
                return data;
            })
    }

    const remove = ({path, id}) => {
        if (!path || !id) return false
        return instance.delete(`/${path}${id ? '/'+id : ''}`)
            .then(({data}) => {
                return data;
            })
    }

    return {
        get, create, update, remove
    }
}