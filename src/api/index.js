import fetch from '@/utils/fetch'
//======================================app设置=======================================
//获取设置数据
export const getAppSettingData = () => fetch({
  url: '/v1/app-setting/getSettingData',
  method: 'get'
});
//移除banner
export const deleteBanner = (reqData) => fetch({
  url: '/v1/app-setting/delete-banner',
  method: 'post',
  data: reqData
});
//保存banner
export const updateBanner = (reqData) => fetch({
  url: '/v1/app-setting/update-banner',
  method: 'post',
  data: reqData
});
//提案详情
export const proposalDetail = (reqData) => fetch({
  url: '/v1/app-setting/proposal-detail',
  method: 'get',
  params: reqData
});
//置顶设置
export const topProposal = (reqData) => fetch({
  url:'/v1/app-setting/top-proposal',
  method: 'post',
  data: reqData,
  /*headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }*/
});
//移除置顶
export const removeTopProposal = (reqData) => fetch({
  url:'/v1/app-setting/remove-top-proposal',
  method: 'post',
  data: reqData,
});
//提案加入热门推荐
export const hotProposal = (reqData) => fetch({
  url:'/v1/app-setting/hot-proposal',
  method: 'post',
  data: reqData,
});
//提案移除热门推荐
export const removeHotProposal = (reqData) => fetch({
  url:'/v1/app-setting/remove-hot-proposal',
  method: 'post',
  data: reqData,
});
//======================================评论审核=======================================
//评论列表
//评论审核列表
export const commentList = (reqData) => fetch({
  url:'/v1/proposal-comment/list',
  method:'get',
  params:reqData,
});
//评论 屏蔽
export const commentStatusHide = (reqData) => fetch({
  url:'/v1/proposal-comment/hide',
  method:'post',
  data:reqData,
});
//评论 取消屏蔽
export const commentStatusCancleHide = (reqData) => fetch({
  url:'/v1/proposal-comment/cancel-hide',
  method:'post',
  data:reqData,
});
//评论 置顶
export const commentTop = (reqData) => fetch({
  url:'/v1/proposal-comment/top',
  method:'post',
  data:reqData,
});
//评论 取消置顶
export const commentCancleTop = (reqData) => fetch({
  url:'/v1/proposal-comment/cancel-top',
  method:'post',
  data:reqData,
});
//======================================提案审核=======================================
//获取提案类型列表
export const getProposalTypeList = (reqData) => fetch({
  url:'/v1/proposal-audit/getProposalTypeList',
  method:'get',
  params:reqData,
});
//获取提案状态列表
export const getProposalStatusList = (reqData) => fetch({
  url:'/v1/proposal-audit/getProposalStatusList',
  method:'get',
  params:reqData,
});
//待审核提案列表
export const noneList = (reqData) => fetch({
  url:'/v1/proposal-audit/none-list',
  method:'get',
  params:reqData,
  noLoading: true
});
//已审核提案列表
export const doneList = (reqData) => fetch({
  url:'/v1/proposal-audit/done-list',
  method:'get',
  params:reqData,
  noLoading: true
});
//未审核提案数量
export const noneCount = (reqData) => fetch({
  url:'/v1/proposal-audit/count',
  method:'get',
  params:reqData
});
//提案详情
export const proposalInfo = (reqData) => fetch({
  url:'/v1/proposal-audit/detail',
  method:'get',
  params:reqData,
});
//提案审核不通过
export const proposalRefuse = (reqData) => fetch({
  url:'/v1/proposal-audit/refuse',
  method:'post',
  data:reqData,
});
//提案审核通过
export const proposalPass = (reqData) => fetch({
  url:'/v1/proposal-audit/pass',
  method:'post',
  data:reqData,
});
//企业用户审核列表
export const enterpriseAuditList = (reqData) => fetch({
  url: '/v1/user/enterpriseAuditList',
  method: 'post',
  data: reqData
});
// 审核企业用户
export const auditEnterprise = (reqData) => fetch({
  url: '/v1/user/enterpriseAudit',
  method: 'post',
  data: reqData
});
// 企业用户审核记录
export const auditRecord = (reqData) => fetch({
  url: '/v1/user/enterpriseAuditInfo',
  method: 'post',
  data: reqData
});
//======================================用户管理=======================================
//用户管理 列表
export const userList = (reqData) => fetch({
  url:'/v1/user/list',
  method:'get',
  params:reqData,
});
//用户管理 启用
export const userListUpdataState = (reqData) => fetch({
  url:'/v1/user/update-state',
  method:'post',
  data:reqData,
});
//用户详情 基本信息
export const userinfoBaseDetail = (reqData) => fetch({
  url:'/v1/user/base-detail',
  method:'get',
  params:reqData,
  noLoading: true
});
//用户详情 账户tkc图标
export const useEchatData = (reqData) => fetch({
  url:'/v1/user/account-tkc',
  method:'get',
  params:reqData,
  noLoading: true
});
//用户详情 账户流水信息
export const userAccountDetail = (reqData) => fetch({
  url:'/v1/user/account-detail',
  method:'get',
  params:reqData,
  noLoading: true
});
//企业用户
export const enterpriseList = (reqData) => fetch({
  url:'/v1/user/enterpriseList',
  method:'post',
  data:reqData,
});
//禁用/启用 企业用户
export const changeEnterpriseStatus = (reqData) => fetch({
  url:'/v1/user/enterpriseDisabled',
  method:'post',
  data:reqData,
});
//======================================提案管理=======================================
//获取提案状态列表
export const proposalMngStatusAndType = (reqData) => fetch({
  url:'/v1/proposal//status-type',
  method:'get',
  params:reqData,
});
//提案管理
export const draftMngListData = (reqData) => fetch({
  url:'/v1/proposal/list',
  method:'get',

  params:reqData,
  noLoading: true
});
//提案管理 带佐证信息
export const draftMngEvidenceCount =(reqData) => fetch({
  url:'/v1/proposal/evidence-count',
  method:'get',
  params:reqData,
  noLoading: true
});
//提案管理 提案详情
export const drafrMngDetail = (reqData) =>fetch({
  url:'/v1/proposal/detail',
  method:'get',
  params:reqData,
});
//提案详情 查看 翻页
export const drafrMngVoteList = (reqData) =>fetch({
  url: '/v1/proposal/vote-list',
  method:'get',
  params:reqData,
});
// 提交佐证
export const submitProof = (reqData) => fetch({
  url: '/v1/proposal/save-evidence',
  method: 'post',
  data: reqData
});
//用户登录
export const userInput = (reqData) => fetch({
  url:'/auth/login',
  method:'post',
  data: reqData
})
//用户登出
export const userLogout = () => fetch({
  // url: '/logout',
  url:'/auth/logout',
  method: 'post'
});
// 保存提案编辑
export const saveProposal = (reqData) => fetch({
  url: '/v1/proposal/save',
  method: 'post',
  data: reqData
});
// 全民公决公式
export const publicity = (reqData) => fetch({
  url: '/v1/proposal/publicity',
  method: 'get',
  params: reqData
});
// 上传
export const fileUpload = (reqData) => fetch({
  url: '/file-upload',
  method: 'post',
  data: reqData
});
//======================================平台概况=======================================
//获取实时信息数据
export const realTimeInfo = () => fetch({
  url: '/v1/homePage/realTimeInfo',
  method: 'get',
  noLoading: true
});
//TKC统计信息
export const getTkcChart = (reqData) => fetch({
  url: '/v1/homePage/statistics',
  method: 'get',
  params: reqData,
  noLoading: true
});
//提案排行
export const proposalTop = (reqData) => fetch({
  url: '/v1/homePage/rankProposal',
  method: 'get',
  params: reqData,
  noLoading: true
});
//用户增长
export const userIncrease = (reqData) => fetch({
  url: '/v1/homePage/user-increase',
  method: 'get',
  params: reqData,
  noLoading: true
});
//用户活跃度
export const userActiveNum = (reqData) => fetch({
  url: '/v1/homePage/user-livenessCount',
  method: 'get',
  params: reqData,
  noLoading: true
});
//======================================平台设置=======================================
export const platformConfig = () => fetch({
  url: '/v1/sysConfig/list',
  method: 'get'
});
export const updatePlatformConfig = (reqData) => fetch({
  url: '/v1/sysConfig/update',
  method: 'post',
  data: reqData
});
// =====================================版本管理=======================================
export const versionList = (reqData) => fetch({
  url: '/v1/version/list',
  method: 'post',
  data: reqData
});
export const versionAdd = (reqData) => fetch({
  url: '/v1/version/add',
  method: 'post',
  data: reqData
});
export const versionUpdate = (reqData) => fetch({
  url: '/v1/version/update',
  method: 'post',
  data: reqData
});
//======================================订单管理=======================================
export const statusType = () => fetch({
  url: '/v1/order/status-type',
  method: 'get'
});
export const orderList = (reqData) => fetch({
  url: '/v1/order/list',
  method: 'get',
  params: reqData
});
export const orderDetail = (reqData) => fetch({
  url: '/v1/order/detail',
  method: 'get',
  params: reqData
});
