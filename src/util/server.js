import Vue from 'vue'
import VueResource from 'vue-resource'
import * as storage from './storage.js'
Vue.use(VueResource)
const http = Vue.http

//查询字段
const fields = function (paramsObj) {
    const url = process.env.BASE_URI + 'metadata/queryList/fields'
    return http.post(url, {
        "tenantId": storage.getTenantId(),
        "userId": storage.getUserId(),
        "params": {
            "condition": { "objectId": paramsObj }
        }
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

// 表单视图
const FormView = function (action, paramsObj) {
    const url = process.env.BASE_URI
        +
        'metadata/'
        +
        action
        +
        "/"
        +
        storage.getTenantId()
        +
        "/"
        +
        storage.getUserId()
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

const queryRecord = function (path, paramsObj) {
    const url = process.env.BASE_URI + 'metadata/queryList/' + path
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}
const loginRequest = function (path, paramsObj) {
    const url = process.env.BASE_URI + "sys/" + path
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

const insertRecord = function (path, paramsObj) {
    const url = process.env.BASE_URI + 'insert' + '/' + path
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

const deleteRecord = function (path, paramsObj) {
    const url = process.env.BASE_URI + 'deletebycondition/' + path
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

const updateRecord = function (path, paramsObj) {
    const url = process.env.BASE_URI + 'updateByCondition/' + path
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

const queryByCondition = function (path, paramsObj) {
    const url = process.env.BASE_URI + 'queryByCondition/' + path
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

// 填报设计表单
const insertFormRecord = function (path, paramsObj) {
    const url = process.env.BASE_URI
        +
        'metadata/addForm/'
        +
        storage.getTenantId()
        +
        "/"
        +
        storage.getUserId()
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

const updateFormRecord = function (path, paramsObj) {
    const url = process.env.BASE_URI
        +
        'metadata/updateForm/'
        +
        storage.getTenantId()
        +
        "/"
        +
        storage.getUserId()
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

const deleteFormRecord = function (path, paramsObj) {
    const url = process.env.BASE_URI
        +
        'metadata/deleteForm/'
        +
        storage.getTenantId()
        +
        "/"
        +
        storage.getUserId()
    return http.post(url, {
        params: paramsObj
    })
        .then(resp => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        })
}

const queryFormRecord = function (path, paramsObj) {
    const url = process.env.BASE_URI
        +
        'metadata/queryForm/'
        +
        storage.getTenantId()
        +
        "/"
        +
        storage.getUserId()
    return http.post(url, {
        params: paramsObj
    })
        .then((resp) => {
            if (resp.body.resCode === 0) {
                return resp.body.result
            }
        },
            (err) => {
                // logout
            })
}

const formDataAction = function (path, params) {
    const url = process.env.BASE_URI + 'dataPlat/' + path
    const _params = {
        tenantId: storage.getTenantId(),
        userId: storage.getUserId(),
        params
    }
    return http.post(url, _params)
        .then(resp => {
            return resp.body
        })
}


function uploadFileByCos(file) {
    const uploadFile = (file) => {
      return new Promise((resolve, reject) => {
        getCosAsync().then((cos) => {
          cos.sliceUploadFile(
            {
              Bucket: "baizhanke-1253522040",
              Region: "ap-chengdu",
              Key: generateFileKey(file.name),
              Body: file,
            },
            function(err, data) {
              if (err) {
                console.error(`${logTag} uploadFileByCos error, `, err);
                reject(err);
              } else {
                const loc = data.Location.startsWith("http")
                  ? data.Location
                  : "https://" + data.Location;
  
                resolve(loc);
              }
            }
          );
        });
      });
    };
  
    if (file) {
      return uploadFile(file);
    }
  
    return resolveFile().then((file) => uploadFile(file));
  }
  
export {
    queryRecord,
    insertRecord,
    deleteRecord,
    insertFormRecord,
    queryFormRecord,
    updateFormRecord,
    deleteFormRecord,
    formDataAction,
    queryByCondition,
    updateRecord,
    loginRequest,
    FormView,
    fields,
    uploadFileByCos
}
