<template>
    <div class="content">
        <div :class="!!isPull ? 'select-form-pull' :'select-form'" ref="domSel" >
            <el-form :inline="true" :label-position="labelPosition" :model="searchDatas" class="demo-form-inline" size="mini">
                <el-row justify="start" :gutter="10">
                    <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                            <el-form-item label="更新时间" style="width: 100%;">
                                <el-date-picker
                                    style="width:100%;"
                                    v-model="searchDatas.uploadDate"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '23:59:59']">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3">
                            <el-form-item label="登录账号"  style="width: 100%;">
                                <el-input v-model="searchDatas.userName" placeholder="登录账号" style="margin-right: 10px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3">
                            <el-form-item label="真实姓名" style="width: 100%;">
                                <el-input v-model="searchDatas.realName" placeholder="真实姓名" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3">
                            <el-form-item label="归属油站" style="width: 100%;">
                                <el-select v-model="searchDatas.oilStation" placeholder="归属油站" style="width: 100%;">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3">
                            <el-form-item label="用户身份" style="width: 100%;">
                                <el-select v-model="searchDatas.idCard" placeholder="用户身份" style="width: 100%;">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3">
                            <el-form-item label="运营商" style="width: 100%;">
                                <el-select v-model="searchDatas.operator" placeholder="运营商" style="width: 100%;">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3">
                            <el-form-item label="运营商" style="width: 100%;">
                                <el-select v-model="searchDatas.operator" placeholder="运营商" style="width: 100%;">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4" :style="{'padding-top': '28px'}">
                        <el-col :xs="10" :sm="10" :md="12" :lg="10" :xl="10">
                            <el-form-item style="width: 100%;">
                                <el-button style="width: 100%;padding-left:5px" class="hidden-sm-and-down" size="mini" type="primary" icon="el-icon-search">查询</el-button>
                                <el-tooltip class="item" effect="dark" content="查询" placement="top-start">
                                    <el-button  class="hidden-md-and-up" size="mini" type="primary" icon="el-icon-search"></el-button>
                                </el-tooltip>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="10" :sm="10" :md="12" :lg="10" :xl="10">
                            <el-form-item style="width: 100%;">
                                <el-button style="width: 100%;padding-left:5px" class="hidden-sm-and-down" size="mini" icon="el-icon-edit-outline">导出</el-button>
                                <el-tooltip class="item" effect="dark" content="导出" placement="top-start">
                                    <el-button  class="hidden-md-and-up" size="mini" icon="el-icon-edit-outline"></el-button>
                                </el-tooltip>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="border-form">
            <span @click="pullForm" style="background: #e10032">
                <i :class="!!isPull? 'el-icon-arrow-up' : 'el-icon-arrow-down'" style="font-size: 12px;"></i>
            </span>
        </div>
        <g7Buttons :buttonsGroup="buttonsGroup" @onAddClick="onAddClick" @onEditClick="onEditClick" @delList="delList"></g7Buttons>

        <g7Table :tableHeaderDatas="tableHeaderDatas" :tableDatas="tableDatas" :paginationDatas="paginationDatas" @handleSelectionChange="handleSelectionChange" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></g7Table>

        <el-dialog title="新增用户" width="50%" :visible.sync="addFormVisible">
            <form-wrapper :formData="rowData" ref="addForm"></form-wrapper>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
                <el-button @click="resetForm('addForm')">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" width="50%" :visible.sync="editFormVisible">
            <form-wrapper :formData="rowData" ref="editForm"></form-wrapper>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
                <el-button @click="resetForm('editForm')">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import formWrapper from './form';

    export default {
        name: '#name#',
        data() {
            return {
                searchDatas: {
                    uploadDate: '',
                    userName: '',
                    realName: '',
                    oilStation: '',
                    idCard: '',
                    operator: '',
                },
                labelPosition: 'top',
                isPull: false,
                isHeight: false,
                currentPage: 4,
                totalPage: 100,
                editFormVisible: false,
                rowData: {},
                buttonsGroup: [{
                    id: 'add',
                    icon: 'el-icon-plus',
                    buttonName: '添加',
                    handle: 'onAddClick',
                    bdisabled: false,
                    type: '',
                }, {
                    id: 'edit',
                    icon: 'el-icon-edit',
                    buttonName: '编辑',
                    handle: 'onEditClick',
                    bdisabled: true,
                    type: '',
                    ismultiple: false,
                }, {
                    id: 'delete',
                    icon: 'el-icon-delete',
                    buttonName: '删除',
                    handle: 'delList',
                    bdisabled: true,
                    type: '',
                    ismultiple: true,
                }],
                tableHeaderDatas: [{
                    fieldName: 'userName',
                    title: '登录账号',
                    width: '120',
                }, {
                    fieldName: 'name',
                    title: '姓名',
                    width: '80',
                }, {
                    fieldName: 'wxId',
                    title: '微信',
                    width: '150',
                }, {
                    fieldName: 'idCard',
                    title: '用户身份',
                    width: '100',
                }, {
                    fieldName: 'oilStation',
                    title: '油站',
                    width: '150',
                }, {
                    fieldName: 'operator',
                    title: '运营商',
                    width: '120',
                }, {
                    fieldName: 'role',
                    title: '角色',
                    width: '120',
                }, {
                    fieldName: 'status',
                    title: '状态',
                    width: '70',
                }, {
                    fieldName: 'updateDate',
                    title: '更新时间',
                    width: '140',
                }, {
                    fieldName: 'loginDate',
                    title: '登录时间',
                    width: '140',
                }, {
                    fieldName: 'pda',
                    title: 'pda',
                    width: '80',
                }, {
                    fieldName: 'padImei',
                    title: 'padImei',
                    width: '180',
                }],
                addFormVisible: false, // 是否显示添加用户弹框
                multipleSelection: [],
                multipleSelections: [],
            };
        },
        components: { formWrapper },
        computed: {
            ...mapGetters('user', [
                'tableDatas',
                'paginationDatas',
            ]),
        },
        mounted() {
            this.getUserlist();
        },
        filters: {
            statusFilter(val) {
                if (val === 1) {
                    return '启用';
                }
                if (val === 2) {
                    return '禁用';
                }
            },
        },
        methods: {
            ...mapActions('user', [
                'getUserLists',
                'deleteUserLists',
                'uploadUserLists',
                'addUserLists',
            ]),
            getUserlist() {
                const datas = {
                    limit: 10,
                    page: this.paginationDatas.page,
                };
                this.getUserLists(datas);
            },
            handleClickFn(e) {
                console.log(e);
            },
            pullForm() {
                const me = this;
                me.isPull = !me.isPull;
                window.setTimeout(() => {
                    me.isHeight = !me.isHeight;
                }, 0);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val.map(item => item.id);
                this.multipleSelections = val;
            },
            handleSelectionRow(row) {
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            delList() {
                const data = {
                    id: this.multipleSelection,
                };
                this.$confirm('确认删除该数据吗?', '提示', {
                    type: 'warning',
                }).then(() => {
                    this.deleteUserLists(data);
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                // this.$emit('handleSizeChange', val);
                this.getUserlist();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                // this.$emit('handleCurrentChange', val);
                this.getUserlist();
            },
            onAddClick() {
                this.addFormVisible = true;
            },
            onAddVisibleChange(val) {
                this.addFormVisible = val;
            },
            onEditClick() {
                this.rowData = Object.assign({}, this.multipleSelections[0]);
                this.editFormVisible = true;
            },
            onEditVisibleChange(val) {
                this.editFormVisible = val;
            },
            resetForm(formName) {
                this.$refs[formName].$refs.userForm.resetFields();
                this.addFormVisible = false;
                this.editFormVisible = false;
            },
            submitForm(formName) {
                this.$refs[formName].$refs.userForm.validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    this.uploadUserLists(this.rowData);
                });
            },
        },
    };

</script>

<style scoped>
</style>
