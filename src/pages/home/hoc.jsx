import Taro, { PureComponent } from "react";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import Immutable from "immutable";
import { getTopicByTabNameAction, clearTopicAction } from "@store/actions";
import { ListContainer } from "@component/List/ListContainer";

/* eslint-disable */
export default function({ tab = "all", title = "精华" }) {
  class HOC extends PureComponent {
    state = {
      refreshing: true
    };

    currentPage = 1;

    loadData = async (page = 1, isResetCurrentPage) => {
      const {
        payload: { success }
      } = await this.props.getTopicByTabNameAction({ page });

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

    onRefresh = () => {
      this.props.clearTopicAction({ tab });
      this.loadData(1, true);
    };

    onEndReached = () => {
      return this.loadData(this.currentPage + 1);
    };

    onItemPressed = (content, title) => {
      return this.props.navigation.navigate("/detail", { content, title });
    };

    componentDidMount = async () => {
      this.loadData(1, true);
    };

    $tempList = Immutable.List();

    componentWillReceiveProps(nextProps) {
      if (nextProps.$list.size === 0 && this.props.$list.size !== 0) {
        this.$tempList = this.props.$list;
      }
    }

    render() {
      return (
        <View style={{ flex: 1 }}>
          <ListContainer
            source={
              this.props.$list.size === 0 ? this.$tempList : this.props.$list
            }
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            onEndReached={this.onEndReached}
            onItemPressed={this.onItemPressed}
          />
        </View>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      $list: state.getIn(["topic", tab])
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      getTopicByTabNameAction: ({ page }) =>
        dispatch(getTopicByTabNameAction({ page, tab })),
      clearTopicAction: ({ tab }) => dispatch(clearTopicAction({ tab }))
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(HOC);
}
