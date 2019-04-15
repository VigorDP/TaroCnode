import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { ScrollView } from "@tarojs/components";
import Immutable from "immutable";
import { AtCard, AtLoadMore } from "taro-ui";
import { getWindowHeight } from "utils/style";
import dayjs from "dayjs";
import { getTopicByTabNameAction, clearTopicAction } from "store/actions";
import styles from "./index.module.scss";

@connect(
  state => {
    return {
      $list: state.getIn(["topic", "ask"])
    };
  },
  dispatch => {
    return {
      dispatchGetTopicByTabNameAction: ({ page }) =>
        dispatch(getTopicByTabNameAction({ page, tab: "ask" })),
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
    status: "loading"
  };

  currentPage = 1;

  loadData = async (page = 1, isResetCurrentPage) => {
    const {
      payload: { data, success }
    } = await this.props.dispatchGetTopicByTabNameAction({
      page
    });

    if (isResetCurrentPage) {
      this.currentPage = 1;
    }

    if (success) {
      page !== 1 && (this.currentPage = page);
    } else {
      page !== 1 && (this.currentPage = page - 1);
    }

    if (data && !data.length) {
      this.setState({
        status: "noMore"
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
        scrollY
        style={{ height: getWindowHeight() }}
        lowerThreshold={100}
        enableBackToTop
        onScrollToLower={this.onEndReached}
      >
        {renderItem}
        {
          <AtLoadMore
            onClick={this.handleClick.bind(this)}
            status={this.state.status}
          />
        }
      </ScrollView>
    );
  }
}

export default AllTab;
