import React, { useState, useContext } from "react";
import Button from "../../components/Button";
import LinkDisplay from "../../components/LinkDisplay/index";
import { ThemeContext } from "../../ThemeContext";
import styles from "./Style.module.css";
import ThemeToggle from "../../components/ThemeToggle/index";

import { createChatInstance, LinkObjType } from "@chat-e2ee/service";

const App = () => {
  const [chatLink, setChatLink] = useState<LinkObjType>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode] = useContext(ThemeContext);

  const generateLink = async () => {
    if (loading) {
      return;
    }
    
    setLoading(true);
    try {
      const chate2ee = createChatInstance();
      const linkResp = await chate2ee.getLink();
      setChatLink(linkResp);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.linkGenerationPage}>
        <div
          className={`${styles.header}
          ${darkMode === true ? styles.darkModeHeader : styles.lightModeHeader}`}
        >
          一次性e2ee加密聊天
          <ThemeToggle />
        </div>
        <div className={`${styles.sectionDefault} ${!darkMode && styles.sectionDefaultLight}`}>
          <div className={styles.title}>
            安全的端到端加密环境，用于与对等方交换敏感信息。
          </div>
          <div className={styles.description}>
            <ul>
              <li>无需登录/注册。</li>
              <li>无跟踪器</li>
              <li>
                您的消息是端到端加密的，从技术上讲无法读取您的消息
                其他人的消息。
              </li>
            </ul>
          </div>
          {!chatLink && (
            <div className={styles.linkGenerationBtnContainer}>
              <br />
              <Button
                label={loading?"创建中...":"创建一个聊天链接"}
                type="primary"
                onClick={generateLink}
                disabled={loading}
              />
            </div>
          )}
          {chatLink && (
            <div className={styles.captchaHeightSetter}>
              <LinkDisplay content={chatLink} />
            </div>
          )}
        </div>
        <div
          className={`${styles.sectionContribute} ${
            darkMode === true ? styles.sectionDefault : styles.sectionDefaultLight
          }`}
        >
          <div className={styles.title}>
            ❤️ 源代码公开于&nbsp;
            <a
              href="https://github.com/muke1908/chat-e2ee"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            , 请随时贡献！
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
