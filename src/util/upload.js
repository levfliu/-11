import Vue from "vue";
import * as uuid from "uuid";

const logTag = `[upload-helper.js]`;

const getCosAsync = () => {
    return import("cos-js-sdk-v5").then(({ default: COS }) => {
        return new COS({
            getAuthorization: function (options, callback) {
                const method = (options.Method || "get").toLowerCase();
                const pathname = "/" + (options.Key || "");
                Vue.prototype.$http
                    .get(
                        "https://api.baizhanke.com/cos-auth?method=" +
                        method +
                        "&pathname=" +
                        pathname
                    )
                    .then((data) => {
                        callback(data.data.result[0]);
                    });
            },
        });
    });
};


const helper = {
    uploadFiles(files) {
        if (Array.isArray(files)) {
            return uploadFilesByCos(files);
        }
        return uploadFilesByCos();
    },
    uploadFile(file) {
        if (file) {
            return uploadFileByCos(file);
        }
        return uploadFileByCos();
    },
};

function resolveFile(multiple) {
    return new Promise((resolve) => {
        const imageinput = document.createElement("input");
        imageinput.setAttribute("type", "file");
        imageinput.setAttribute("multiple", true);
        imageinput.setAttribute("accept", "image/*");
        imageinput.addEventListener("change", () => {
            const files = imageinput.files;
            if (multiple) {
                resolve(files);
            } else {
                resolve(files[0]);
            }
        });
        imageinput.click();
    });
}

function uploadFilesByCos(files) {
    const uploadFiles = (files) => {
        return Promise.all(Array.from(files).map((e) => uploadFileByCos(e))).then(
            (locations) => {
                return locations;
            }
        );
    };

    if (Array.isArray(files)) {
        return uploadFiles(files);
    }

    return resolveFile(true).then((files) => uploadFiles(files));
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
                    function (err, data) {
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


function generateFileKey(fileName) {
    const ext = fileName.slice(fileName.lastIndexOf("."));
    return `${uuid.v4()}${ext}`;
}

export default helper;
