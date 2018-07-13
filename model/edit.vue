 <template>
    <el-dialog title="修改用户" :visible.sync="bEditVisible">
        <el-form :model="formData" label-position="top" :rules="rules" ref="userEditForm" label-width="80px" size="mini">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="登录账号" prop="userName">
                        <el-input v-model="formData.userName" auto-complete="off" name="email" placeholder="登录邮箱" style="width: 100%;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input v-model="formData.name" auto-complete="off" name="nickname" placeholder="真实姓名" style="width: 100%;"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="formData.password" type="password" auto-complete="off" name="password" placeholder="登录密码" style="width: 100%;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="身份类别" prop="idCard">
                        <el-select v-model="formData.idCard"  placeholder="请选择角色"  style="width: 100%;">
                            <el-option label="主任" value="person">主任</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="运营商" prop="nickname">
                        <el-select v-model="formData.operator"  placeholder="请选择角色"  style="width: 100%;">
                            <el-option label="上海" value="shangai">上海</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="归属油站" prop="nickname">
                        <el-select v-model="formData.oilStation"  placeholder="请选择角色"  style="width: 100%;">
                            <el-option label="上海" value="shangai">上海</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="角色" prop="nickname">
                        <el-select v-model="formData.role"  placeholder="请选择角色"  style="width: 100%;">
                            <el-option label="管理员" value="admin">管理员</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="可用性">
                        <el-radio-group v-model="formData.status">
                            <el-radio class="radio" :label="1">启用</el-radio>
                            <el-radio class="radio" :label="2">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="bEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('userEditForm')" :loading="isLoading">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import $http from '@/utils/http';

    export default {
        props: {
            isEditVisible: { type: Boolean, default: false },
            rowData: null,
        },
        data() {
            return {
                bEditVisible: this.isEditVisible,
                isLoading: false,
                props: { value: 'id', label: 'name' },
                formData: {},
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
        watch: {
            isEditVisible(val) {
                this.bEditVisible = val;
            },
            bEditVisible(val) {
                this.$emit('onEditVisibleChange', val);
            },
            rowData(row, oldrow) {
                console.log(oldrow);
                this.formData = row;
            },
        },
        mounted() {},
        methods: {
            submitForm(formName) {
                console.log(formName);
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    $http.post('/user/edit', this.formData).then((res) => {
                        console.log(res);
                        this.$refs[formName].resetFields();
                        this.bEditVisible = false;
                        this.$emit('afterSubmit');
                    }, (error) => {
                        console.log(error);
                    });
                });
                console.log(formName);
            },
        },
    };
</script>
