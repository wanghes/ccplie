<template>
    <el-form :model="formData" label-position="top" :rules="rules" ref="userForm" label-width="80px" size="mini">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="登录账号" prop="userName">
                    <el-input v-model="formData.userName" auto-complete="off" placeholder="登录账号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="真实姓名" prop="name">
                    <el-input v-model="formData.name" auto-complete="off" placeholder="真实姓名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" type="password" auto-complete="off" placeholder="登录密码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="身份类别" prop="idCard">
                    <el-select v-model="formData.idCard" placeholder="请选择角色" style="width: 100%;">
                        <el-option label="主任" value="person">主任</el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="运营商" prop="operator">
                    <el-select v-model="formData.operator"  placeholder="请选择运营商"  style="width: 100%;">
                        <el-option label="上海" value="shangai">上海</el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="归属油站" prop="oilStation">
                    <el-select v-model="formData.oilStation"  placeholder="请选择油站"  style="width: 100%;">
                        <el-option label="上海" value="shangai">上海</el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="角色" prop="role">
                    <el-select v-model="formData.role"  placeholder="请选择角色"  style="width: 100%;">
                        <el-option label="管理员" value="admin">管理员</el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="可用性" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio class="radio" :label="1">启用</el-radio>
                        <el-radio class="radio" :label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name: 'userForm',
        props: {
            formData: {
                type: Object,
            },
        },
        data() {
            return {
                rules: {
                    userName: [
                        { required: true, message: '请输入登录账号', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    ],
                },
            };
        },
        mounted() {
        },
        methods: {},
    };
</script>
