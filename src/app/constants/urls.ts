import { environment } from '../../environments/environment';
let url =environment.baseurl;
export const AppConstant =Object.freeze({
    BASE_API_URL:url
})
export class Urls {
    static baseUrl: string = environment.baseurl; //Use developmentEnvironment.baseurl for "http://127.0.0.1:8000/"

    static LeaderBoardList: string = "api/topper/";
    static BadgesList: string = "api/achievement/userbasedachievement?category=1";
    static ProfileData: string = "api/user/userprofile";
    static ProfilePhotoUpdate: string = "api/user/photo/update";

    static ListUser: string = "api/user/";
    static login: string = "api/user/token/";
    static googlelogin: string = "api/user/google/api/";
    static achievementList: string = "api/achievement/achievement";
    static achievementListWithoutLimit: string = "api/achievement/achievement?export=1";

    static AddActivity: string = "api/activity/activity";

    //Achievement Category URLS
    static AddAchievementCategory: string = "api/achievement/category";
    static ViewAchievementCategory: string = "api/achievement/category/{categoryId}";
    static UpdateAchievementCategory: string = "api/achievement/category/{categoryId}";
    static DeleteAchievementCategory: string = "api/achievement/category/{categoryId}";
    static ListAchievementCategory: string = "api/achievement/category";
    static ListAchievementCategoryWithoutLimit: string = "api/achievement/category?export=1";

    //Activity  URLS
    static ActivityList: string = "api/activity/activity";
    static ActivityListWithoutLimit: string = "api/activity/activity?export=1";
    static ActivityDimensionScore: string = "api/activity/activity-dimension-score?taskidentifier=todo"

    //Todo  URLS
    static todoList: string = "api/todo/todo";
    static Updatetodo: string = "api/todo/todo/{todoId}/";
    static UpdateToDoStatus: string = "api/todo/todoactivity";
    static AddToDoActivity: string = "api/activity/todo";
    static todoListMulti: string = "api/todo/todomulti";
    static todoApproval:string="api/todo/approval"


    //Dimension  URLS
    static ListDimension: string = "api/activity/dimension";
    static ListDimensionWithoutLimit: string = "api/activity/dimension?export=1";
    //Achievement URLS
    static AddAchievement: string = "api/achievement/achievement";
    static ViewAchievement: string = "api/achievement/achievement/{achievementId}";
    static UpdateAchievement: string = "api/achievement/achievement/{achievementId}";
    static DeleteAchievement: string = "api/achievement/achievement/{achievementId}";

    //Image Upload
    static imageUpload: string = "api/achievement/imageupload";

    //Achievement Dimension Link URLS
    static AddAchievementDimensionLink: string = "api/activity/achievement-dimension-multi-link";
    static ViewAchievementDimensionLink: string = "api/activity/achievement-dimension-multi-link/{linkId}";
    static UpdateAchievementDimensionLink: string = "api/activity/achievement-dimension-multi-link/{linkId}";
    static DeleteAchievementDimensionLink: string = "api/activity/achievement-dimension-multi-link/{linkId}";
    static ListAchievementDimensionLink: string = "api/activity/achievement-dimension-multi-link";

    //DimensionCategory  URLS
    static ListDimensionCategory: string = "api/activity/dimensioncategory";
    static ListDimensionCategoryWithoutLimit: string = "api/activity/dimensioncategory?export=1";

    //Activity Dimension score URLS
    static ListActivityDimensionScoreToDo: string = "api/activity/activity-dimension-score?taskidentifier=todo"


}