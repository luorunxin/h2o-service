/*
 Navicat Premium Data Transfer

 Source Server         : h2o
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : h2o

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 08/04/2020 01:51:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dutes
-- ----------------------------
DROP TABLE IF EXISTS `dutes`;
CREATE TABLE `dutes` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '职务id',
  `duty_name` varchar(255) NOT NULL COMMENT '职务名称',
  `permission_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限id',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dutes
-- ----------------------------
BEGIN;
INSERT INTO `dutes` VALUES (1, '超级管理员', '1,2,3,4,5,6,7,10,11,12,8,13,14,15,9,16,17,18,19,20', '2020-03-25 22:28:51');
INSERT INTO `dutes` VALUES (2, '普通管理员', '1,2,3,4,5,6,7,8,9,19,20', '2020-03-26 18:04:40');
INSERT INTO `dutes` VALUES (3, '员工', '1,2,3,4,5', '2020-03-26 18:07:19');
COMMIT;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` varchar(255) NOT NULL COMMENT '商品id',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `price` double(10,2) NOT NULL COMMENT '价格',
  `ship_address` varchar(255) NOT NULL COMMENT '发货地址',
  `courier_fees` double(10,2) NOT NULL COMMENT '快递费用',
  `goods_category_id` int(10) NOT NULL COMMENT '商品类别',
  `parameter` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '产品参数',
  `create_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
BEGIN;
INSERT INTO `goods` VALUES ('0da5fd40-1185-4f79-af51-1d51300a3660', '12345', 1234.00, '我的色放的染发膏', 12.00, 1001, '微微发热:啊', '2020-03-27 13:21:55');
INSERT INTO `goods` VALUES ('1e053498-80d5-480e-9f1b-9966b69e7f7d', 'fear', 123.00, '柳骨', 32.00, 1001, '阿生日了也不管用:阿僧呀', '2020-03-27 13:22:56');
INSERT INTO `goods` VALUES ('459fcb6c-783f-488e-99f8-1152ef1db41a', '饿而发', 234.00, 'revert', 32.00, 1001, '是 v:身体', '2020-03-27 13:22:34');
INSERT INTO `goods` VALUES ('4c8bbf84-82ef-41fe-84a8-4966231b58f8', '看会书吧和 v', 1.00, '大哥', 2.00, 1001, '开始对吧:大家伙 v', '2020-03-27 17:30:42');
INSERT INTO `goods` VALUES ('50ad3836-c2b0-441c-8e1b-c07d761b30ee', 'asva', 23.00, '是的 v 爱 u 好', 23.00, 1001, '发多少苦:低俗化', '2020-03-27 13:26:47');
INSERT INTO `goods` VALUES ('609bb8cf-aaaf-4e1f-87b2-9048f5c2d56c', '哇唔高', 234.00, '饿阿速干', 23.00, 1001, '赛虎:诶复活', '2020-03-27 13:23:16');
INSERT INTO `goods` VALUES ('61057568-06b8-4338-872c-4cf3afe06c06', '是短裤好', 32.00, '饿哇分 iu 好', 23.00, 1001, '额我佛 i 好:额我 iu 发货', '2020-03-27 13:27:42');
INSERT INTO `goods` VALUES ('752f0bfd-172f-42a3-8b79-1b004484e49a', '地方看见你', 23.00, '我体会', 32.00, 1001, '额发户:额好', '2020-03-27 13:28:01');
INSERT INTO `goods` VALUES ('7eecbb4d-9bae-43e8-8592-8e6864997fae', '饿啊晚饭', 324.00, '2热伤风', 2.00, 1001, '饿哇分:阿尔法', '2020-03-27 13:22:12');
INSERT INTO `goods` VALUES ('82f8f030-2793-42e8-b222-b82c8543b6c2', '撒出', 2.00, '32是 v 大', 4232.00, 1001, 'v 啊是 v:v 啊', '2020-03-27 13:25:06');
INSERT INTO `goods` VALUES ('a6ec8987-a308-41c0-b105-53174c56c9ba', '诶无关', 21.00, '诶武汉', 23.00, 1001, '丢丢和 iu:i u 凤凰网 i', '2020-03-27 13:27:04');
INSERT INTO `goods` VALUES ('ae08cad3-2822-4105-a4f0-ce91612ae2dc', '发的 v', 213.00, '额我房间开会', 312.00, 1001, '为何:为何', '2020-03-27 13:27:24');
INSERT INTO `goods` VALUES ('e2635473-17d4-46a3-8a44-93eabf60c031', '【限量版夹克】宇宙最帅夹克，你还在等什么，快来抢购吧', 299.00, '湖北省武汉市武昌区', 0.00, 1001, '适用人群:青年儿童;季节:春秋季;款式:2020款;风格:休闲运动', '2020-03-25 23:12:58');
COMMIT;

-- ----------------------------
-- Table structure for goods_amount
-- ----------------------------
DROP TABLE IF EXISTS `goods_amount`;
CREATE TABLE `goods_amount` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '库存id',
  `goods_id` varchar(255) NOT NULL COMMENT '商品id',
  `amount` int(10) NOT NULL COMMENT '库存',
  `color` varchar(255) DEFAULT NULL COMMENT '颜色',
  `size` varchar(255) DEFAULT NULL COMMENT '尺寸',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_amount
-- ----------------------------
BEGIN;
INSERT INTO `goods_amount` VALUES (10, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '黑色', 'X');
INSERT INTO `goods_amount` VALUES (11, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '黑色', 'L');
INSERT INTO `goods_amount` VALUES (12, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '黑色', 'XL');
INSERT INTO `goods_amount` VALUES (13, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '黑色', 'XXL');
INSERT INTO `goods_amount` VALUES (14, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '黑色', 'XXXL');
INSERT INTO `goods_amount` VALUES (15, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '白色', 'X');
INSERT INTO `goods_amount` VALUES (16, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '白色', 'L');
INSERT INTO `goods_amount` VALUES (17, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '白色', 'XL');
INSERT INTO `goods_amount` VALUES (18, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '白色', 'XXL');
INSERT INTO `goods_amount` VALUES (19, 'e2635473-17d4-46a3-8a44-93eabf60c031', 0, '白色', 'XXXL');
INSERT INTO `goods_amount` VALUES (20, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '红色', 'X');
INSERT INTO `goods_amount` VALUES (21, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '红色', 'L');
INSERT INTO `goods_amount` VALUES (22, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '红色', 'XL');
INSERT INTO `goods_amount` VALUES (23, 'e2635473-17d4-46a3-8a44-93eabf60c031', 99, '红色', 'XXL');
INSERT INTO `goods_amount` VALUES (24, 'e2635473-17d4-46a3-8a44-93eabf60c031', 0, '红色', 'XXXL');
INSERT INTO `goods_amount` VALUES (25, '0da5fd40-1185-4f79-af51-1d51300a3660', 234, '安德森', '啊');
INSERT INTO `goods_amount` VALUES (26, '7eecbb4d-9bae-43e8-8592-8e6864997fae', 23, 'are', '热啊');
INSERT INTO `goods_amount` VALUES (27, '459fcb6c-783f-488e-99f8-1152ef1db41a', 21, '阿 v', '是的 v 分');
INSERT INTO `goods_amount` VALUES (28, '1e053498-80d5-480e-9f1b-9966b69e7f7d', 2, '饿爱鹿哥', '饿服务 iu 好i');
INSERT INTO `goods_amount` VALUES (29, '609bb8cf-aaaf-4e1f-87b2-9048f5c2d56c', 234, '涩谷', '诶无关');
INSERT INTO `goods_amount` VALUES (30, '82f8f030-2793-42e8-b222-b82c8543b6c2', 2134, '撒', 'v 发 v');
INSERT INTO `goods_amount` VALUES (31, '50ad3836-c2b0-441c-8e1b-c07d761b30ee', 234, '唉句话', '地鼠');
INSERT INTO `goods_amount` VALUES (32, 'a6ec8987-a308-41c0-b105-53174c56c9ba', 23, '一', '低俗化');
INSERT INTO `goods_amount` VALUES (33, 'ae08cad3-2822-4105-a4f0-ce91612ae2dc', 234, '二龙湖', 'i u 电话');
INSERT INTO `goods_amount` VALUES (34, '61057568-06b8-4338-872c-4cf3afe06c06', 324, '聚会', '发丢和');
INSERT INTO `goods_amount` VALUES (35, '752f0bfd-172f-42a3-8b79-1b004484e49a', 23, '大客户', '发丢武汉');
INSERT INTO `goods_amount` VALUES (36, '4c8bbf84-82ef-41fe-84a8-4966231b58f8', 29, '黑色', 'XL');
COMMIT;

-- ----------------------------
-- Table structure for goods_category
-- ----------------------------
DROP TABLE IF EXISTS `goods_category`;
CREATE TABLE `goods_category` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '类别id',
  `code` int(10) NOT NULL COMMENT '类别编码',
  `name` varchar(255) NOT NULL COMMENT '类别名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_category
-- ----------------------------
BEGIN;
INSERT INTO `goods_category` VALUES (1, 1001, '服装');
COMMIT;

-- ----------------------------
-- Table structure for goods_images
-- ----------------------------
DROP TABLE IF EXISTS `goods_images`;
CREATE TABLE `goods_images` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '图片id',
  `goods_id` varchar(255) NOT NULL COMMENT '商品id',
  `src` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '其他图片路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_images
-- ----------------------------
BEGIN;
INSERT INTO `goods_images` VALUES (10, 'e2635473-17d4-46a3-8a44-93eabf60c031', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (11, 'e2635473-17d4-46a3-8a44-93eabf60c031', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (12, 'e2635473-17d4-46a3-8a44-93eabf60c031', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (13, '0da5fd40-1185-4f79-af51-1d51300a3660', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (14, '0da5fd40-1185-4f79-af51-1d51300a3660', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (15, '0da5fd40-1185-4f79-af51-1d51300a3660', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (16, '7eecbb4d-9bae-43e8-8592-8e6864997fae', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (17, '7eecbb4d-9bae-43e8-8592-8e6864997fae', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (18, '7eecbb4d-9bae-43e8-8592-8e6864997fae', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (19, '459fcb6c-783f-488e-99f8-1152ef1db41a', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (20, '459fcb6c-783f-488e-99f8-1152ef1db41a', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (21, '459fcb6c-783f-488e-99f8-1152ef1db41a', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (22, '1e053498-80d5-480e-9f1b-9966b69e7f7d', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (23, '1e053498-80d5-480e-9f1b-9966b69e7f7d', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (24, '1e053498-80d5-480e-9f1b-9966b69e7f7d', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (25, '609bb8cf-aaaf-4e1f-87b2-9048f5c2d56c', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (26, '609bb8cf-aaaf-4e1f-87b2-9048f5c2d56c', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (27, '609bb8cf-aaaf-4e1f-87b2-9048f5c2d56c', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (28, '82f8f030-2793-42e8-b222-b82c8543b6c2', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (29, '82f8f030-2793-42e8-b222-b82c8543b6c2', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (30, '82f8f030-2793-42e8-b222-b82c8543b6c2', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (31, '50ad3836-c2b0-441c-8e1b-c07d761b30ee', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (32, '50ad3836-c2b0-441c-8e1b-c07d761b30ee', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (33, '50ad3836-c2b0-441c-8e1b-c07d761b30ee', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (34, 'a6ec8987-a308-41c0-b105-53174c56c9ba', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (35, 'a6ec8987-a308-41c0-b105-53174c56c9ba', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (36, 'a6ec8987-a308-41c0-b105-53174c56c9ba', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (37, 'ae08cad3-2822-4105-a4f0-ce91612ae2dc', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (38, 'ae08cad3-2822-4105-a4f0-ce91612ae2dc', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (39, 'ae08cad3-2822-4105-a4f0-ce91612ae2dc', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (40, '61057568-06b8-4338-872c-4cf3afe06c06', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (41, '61057568-06b8-4338-872c-4cf3afe06c06', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (42, '61057568-06b8-4338-872c-4cf3afe06c06', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (43, '752f0bfd-172f-42a3-8b79-1b004484e49a', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (44, '752f0bfd-172f-42a3-8b79-1b004484e49a', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (45, '752f0bfd-172f-42a3-8b79-1b004484e49a', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
INSERT INTO `goods_images` VALUES (46, '4c8bbf84-82ef-41fe-84a8-4966231b58f8', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg');
INSERT INTO `goods_images` VALUES (47, '4c8bbf84-82ef-41fe-84a8-4966231b58f8', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg');
INSERT INTO `goods_images` VALUES (48, '4c8bbf84-82ef-41fe-84a8-4966231b58f8', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg');
COMMIT;

-- ----------------------------
-- Table structure for goods_type
-- ----------------------------
DROP TABLE IF EXISTS `goods_type`;
CREATE TABLE `goods_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `goods_id` varchar(255) NOT NULL COMMENT '商品id',
  `category_id` int(10) NOT NULL COMMENT '类别id',
  `part_id` int(10) DEFAULT NULL COMMENT '部位id',
  `gender` int(10) DEFAULT NULL COMMENT '性别：1男，2女',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_type
-- ----------------------------
BEGIN;
INSERT INTO `goods_type` VALUES (3, 'e2635473-17d4-46a3-8a44-93eabf60c031', 1001, 10010, 1);
INSERT INTO `goods_type` VALUES (4, '0da5fd40-1185-4f79-af51-1d51300a3660', 1001, 10010, 2);
INSERT INTO `goods_type` VALUES (5, '7eecbb4d-9bae-43e8-8592-8e6864997fae', 1001, 10011, 2);
INSERT INTO `goods_type` VALUES (6, '459fcb6c-783f-488e-99f8-1152ef1db41a', 1001, 10012, 1);
INSERT INTO `goods_type` VALUES (7, '1e053498-80d5-480e-9f1b-9966b69e7f7d', 1001, 10010, 1);
INSERT INTO `goods_type` VALUES (8, '609bb8cf-aaaf-4e1f-87b2-9048f5c2d56c', 1001, 10011, 1);
INSERT INTO `goods_type` VALUES (9, '82f8f030-2793-42e8-b222-b82c8543b6c2', 1001, 10010, 1);
INSERT INTO `goods_type` VALUES (10, '50ad3836-c2b0-441c-8e1b-c07d761b30ee', 1001, 10011, 1);
INSERT INTO `goods_type` VALUES (11, 'a6ec8987-a308-41c0-b105-53174c56c9ba', 1001, 10012, 2);
INSERT INTO `goods_type` VALUES (12, 'ae08cad3-2822-4105-a4f0-ce91612ae2dc', 1001, 10011, 2);
INSERT INTO `goods_type` VALUES (13, '61057568-06b8-4338-872c-4cf3afe06c06', 1001, 10011, 1);
INSERT INTO `goods_type` VALUES (14, '752f0bfd-172f-42a3-8b79-1b004484e49a', 1001, 10012, 1);
INSERT INTO `goods_type` VALUES (15, '4c8bbf84-82ef-41fe-84a8-4966231b58f8', 1001, 10011, 1);
COMMIT;

-- ----------------------------
-- Table structure for goods_types
-- ----------------------------
DROP TABLE IF EXISTS `goods_types`;
CREATE TABLE `goods_types` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '部位id',
  `code` int(10) NOT NULL COMMENT '部位编码',
  `name` varchar(255) NOT NULL COMMENT '部位名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_types
-- ----------------------------
BEGIN;
INSERT INTO `goods_types` VALUES (1, 10010, '上装');
INSERT INTO `goods_types` VALUES (2, 10011, '下装');
INSERT INTO `goods_types` VALUES (3, 10012, '鞋子');
COMMIT;

-- ----------------------------
-- Table structure for goods_videos
-- ----------------------------
DROP TABLE IF EXISTS `goods_videos`;
CREATE TABLE `goods_videos` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '视频id',
  `goods_id` varchar(255) NOT NULL COMMENT '商品id',
  `cover_src` varchar(255) NOT NULL COMMENT '封面视频路径',
  `src` varchar(255) DEFAULT NULL COMMENT '其他视频路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` int(10) NOT NULL COMMENT '权限id',
  `label` varchar(255) NOT NULL COMMENT '权限名称',
  `identify` varchar(255) NOT NULL COMMENT '权限标识',
  `parent_id` int(10) NOT NULL COMMENT '父级权限id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permissions
-- ----------------------------
BEGIN;
INSERT INTO `permissions` VALUES (1, '商品', 'goods', 0);
INSERT INTO `permissions` VALUES (2, '商品列表', 'goods_list', 1);
INSERT INTO `permissions` VALUES (3, '添加', 'add_goods', 2);
INSERT INTO `permissions` VALUES (4, '修改', 'update_goods', 2);
INSERT INTO `permissions` VALUES (5, '删除', 'delete_goods', 2);
INSERT INTO `permissions` VALUES (6, '权限管理', 'permissions_manage', 0);
INSERT INTO `permissions` VALUES (7, '权限', 'permission', 6);
INSERT INTO `permissions` VALUES (8, '职务', 'duty', 6);
INSERT INTO `permissions` VALUES (9, '角色', 'role', 6);
INSERT INTO `permissions` VALUES (10, '添加', 'add_permission', 7);
INSERT INTO `permissions` VALUES (11, '删除', 'delete_permission', 7);
INSERT INTO `permissions` VALUES (12, '提交', 'submit_permission', 7);
INSERT INTO `permissions` VALUES (13, '添加', 'add_duty', 8);
INSERT INTO `permissions` VALUES (14, '修改', 'update_duty', 8);
INSERT INTO `permissions` VALUES (15, '删除', 'delete_duty', 8);
INSERT INTO `permissions` VALUES (16, '添加', 'add_role', 9);
INSERT INTO `permissions` VALUES (17, '修改', 'update_role', 9);
INSERT INTO `permissions` VALUES (18, '删除', 'delete_role', 9);
INSERT INTO `permissions` VALUES (19, '用户', 'user', 0);
INSERT INTO `permissions` VALUES (20, '用户列表', 'user_list', 19);
COMMIT;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `name` varchar(255) NOT NULL COMMENT '角色姓名',
  `gender` int(10) NOT NULL COMMENT '角色性别',
  `phone` varchar(255) NOT NULL COMMENT '角色电话',
  `password` varchar(255) NOT NULL COMMENT '登陆密码',
  `duty_id` int(10) NOT NULL COMMENT '职务id',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles
-- ----------------------------
BEGIN;
INSERT INTO `roles` VALUES (1, '罗某人', 1, '18888888888', '123456', 1, '2020-03-26 18:00:00');
INSERT INTO `roles` VALUES (19, '罗小号', 1, '18999999999', '123456', 2, '2020-03-26 18:05:11');
INSERT INTO `roles` VALUES (26, '某姓罗员工', 2, '19000000000', '123456', 3, '2020-03-26 18:53:27');
COMMIT;

-- ----------------------------
-- Table structure for shopping_cart
-- ----------------------------
DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE `shopping_cart` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `goods_id` varchar(255) NOT NULL COMMENT '商品id',
  `select_sku` int(10) NOT NULL COMMENT '商品库存id',
  `sku_num` int(10) NOT NULL COMMENT '选择的商品数量',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `user` varchar(255) NOT NULL COMMENT '用户账号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopping_cart
-- ----------------------------
BEGIN;
INSERT INTO `shopping_cart` VALUES (39, '4c8bbf84-82ef-41fe-84a8-4966231b58f8', 36, 1, '2020-04-06 13:35:52', '17107852335');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL COMMENT '用户id',
  `phone` varchar(255) NOT NULL COMMENT '用户手机号',
  `login_time` datetime NOT NULL COMMENT '用户登录时间',
  `origin` varchar(255) NOT NULL COMMENT '用户地址',
  `user_agent` varchar(255) NOT NULL COMMENT '用户使用手机型号',
  `location` varchar(255) NOT NULL COMMENT '用户登陆定位地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
