import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, ScrollView } from "@tarojs/components";
import Immutable from "immutable";
import { AtCard } from "taro-ui";
import dayjs from "dayjs";
import { getTopicByTabNameAction, clearTopicAction } from "store/actions";
import styles from "./index.module.scss";

@connect(
  state => {
    return {
      $list: state.getIn(["topic", "all"])
    };
  },
  dispatch => {
    return {
      dispatchGetTopicByTabNameAction: ({ page }) =>
        dispatch(getTopicByTabNameAction({ page, tab: "all" })),
      dispatchClearTopicAction: ({ tab }) => dispatch(clearTopicAction({ tab }))
    };
  }
)
class AllTab extends Component {
  constructor(props) {
    super(props);
    Object.assign(this, this.props.ownProps);
  }
  state = {
    refreshing: true
  };

  currentPage = 1;

  loadData = async (page = 1, isResetCurrentPage) => {
    const {
      payload: { success }
    } = await this.props.dispatchGetTopicByTabNameAction({
      page
    });

    if (isResetCurrentPage) {
      this.currentPage = 1;
    }

    if (success) {
      page !== 1 && (this.currentPage = page);
      this.setState({
        refreshing: false
      });
    } else {
      page !== 1 && (this.currentPage = page - 1);
      this.setState({
        refreshing: false
      });
    }
  };

  onEndReached = () => {
    return this.loadData(this.currentPage + 1);
  };

  onItemPressed = (title, content) => {
    return Taro.navigateTo({
      url: `../detail/index?content=${content}&title=${title}`
    });
  };

  componentDidMount = async () => {
    this.loadData(1, true);
  };

  render() {
    const $list = this.props.$list || Immutable.List();
    const renderItem = $list.toJS().map((item, index) => {
      return (
        <AtCard
          key={`${index} ${this.tab}`}
          note={dayjs(item.lastRepliedAt).format("YYYY-MM-DD HH:mm")}
          extra={`${item.replyCount}/${item.visitCount}`}
          title={item.author.loginName}
          thumb={item.author.avatarUrl}
          className={styles.card}
          onClick={this.onItemPressed.bind(this, item.title, item.content)}
        >
          {item.title}
        </AtCard>
      );
    });
    return (
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop='100'
        style='height: 1500px;'
        lowerThreshold={0}
        enableBackToTop
        onScrollToLower={this.onEndReached}
      >
        {renderItem}
      </ScrollView>
    );
  }
}

export default AllTab;
