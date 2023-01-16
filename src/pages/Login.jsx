import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, message, Watermark } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/icon.png";
import { Logo } from "../components";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/login",
        values
      );
      if (res.status === 200) {
        localStorage.setItem("user", res.data._id);
        message.success("Login successful");
        navigate("/home");
        setLoading(false);
      }
    } catch (error) {
      if (error.response.status === 500) {
        message.error("There is a problem");
      } else {
        message.error("Check your username or password");
      }
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Watermark
        height={30}
        width={30}
        image={Image}
        className="h-screen blur-sm bg-white"
      ></Watermark>
      <div className="w-[400px] rounded-md p-5 mx-auto bg-[#f9f9f9] absolute top-1/2 left-1/2 -ml-[200px] -mt-[200px] shadow-2xl">
        <div className="mb-5 flex justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="bg-inherit" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="flex text-xs gap-x-2">
          <p>{"Don't have an account? "}</p>
          <Link className="text-[#5bcadf]" to="/register">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
