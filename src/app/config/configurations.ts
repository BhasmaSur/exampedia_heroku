export class ConfigurationsFile{
    public static readonly AUTH_LOGIN='loggedInUser';
    public static readonly AUTH_SIGNUP='signedUpUser';
    public static readonly AUTH_COACHING_SIGUP='signedUpCoaching';
    public static readonly AUTH_COACHING_LOGIN='loggedInCoaching';
    public static readonly AUTH_COACHING_COURSES='CoachingCOURSES';
    public static readonly AUTH_COACHING_VIDEOS='CoachingVIDEOS';
    public static readonly AUTH_COACHING_EXAMS='signedUpEXAMS';
    public static readonly AUTH_COACHING_PDFS='loggedInPDFS';
    public static readonly AUTH_MARKET_SIGUP='signedUpUser';
    public static readonly AUTH_MARKET_LOGIN='loggedInMarketUser';
    public static readonly AUTH_MARKET_COURSES='MarketCOURSES';
    public static readonly AUTH_MARKET_VIDEOS='MarketVIDEOS';
    public static readonly AUTH_MARKET_SUBJECTS='MarketSUBJECTS';
    public static readonly AUTH_MARKET_EXAMS='MarketEXAMS';
    public static readonly AUTH_MARKET_PDFS='MarketPDFS';
    public static readonly AUTH_COACHING_PIC='CoachingPIC';
    public static readonly CONTENT_SERVER_ADDRESS="https://media.publit.io/file/";

    //===================== Coaching contants ===================================
    public static readonly ALL_COACHINGS='allCoachings';
    public static readonly COACHING_ADMIN_LOGGED_IN='coaching_admin';
    //====================== xxxxxxxxxxx =========================================
    //===================== Users contants ===================================
    public static readonly LOGGED_IN_USER='userLoggedIn';
    //====================== xxxxxxxxxxx =========================================
    
    //======================== Course contents ==================================
    public static readonly ALL_COURSES='allCourses';
    public static readonly COACHING_COURSE_IN_FOCUS="coaching_course_in_focus";
    //======================== XXXX =============================================
    //======================== Exams contents ==================================
    public static readonly ALL_EXAMS='allExams';
    public static readonly COURSE_EXAM_IN_GALLERY="course_exam_in_gallery";
    //======================== XXXX =============================================
    //======================== videos contents ==================================
    public static readonly ALL_VIDEOS='allVideos';
    public static readonly COURSE_VIDEO_IN_GALLERY="course_video_in_gallery";
    //======================== XXXX =============================================
    //======================== pdfs contents ==================================
    public static readonly ALL_PDFS='allPDFs';
    public static readonly COURSE_PDFS_IN_GALLERY='course_pdfs_in_gallery';
    //======================== XXXX =============================================
}