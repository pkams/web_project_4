export default class UserInfo{
    constructor({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo(){
        const name = this._name;
        const job = this._job;
        return { name, job };
    }

    setUserInfo(newName, newJob){
        this._name.value = newName.value;
        this._job.value = newJob.value;
    }
}