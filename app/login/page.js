"use client"

import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/context/Auth";
import { useRouter } from "next/navigation";
import {
    Form,
    Input,
    Button,
    Card,
    Typography,
    Spin,
    message
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SignIn = () => {
    const { login, user } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user.token) {
            console.log('Redirecting...');
            router.push("/");
        }
    }, [user, router]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await login({
                login: values.email,
                password: values.password
            });
            message.success("Вход выполнен успешно!");
        } catch (error) {
            message.error("Ошибка входа. Проверьте логин и пароль.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <Card
                className="w-full max-w-md shadow-lg"
                styles={{ body: { padding: '40px' } }}
            >
                <div className="text-center mb-8">
                    <Title level={2} className="mb-2">
                        Вход в систему
                    </Title>
                </div>

                <Form
                    name="login"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        label="Логин"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите ваш логин!'
                            }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Введите ваш логин"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите ваш пароль!'
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Введите ваш пароль"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            size="large"
                        >
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
                {loading && (
                    <div className="text-center mt-4">
                        <Spin />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default SignIn;