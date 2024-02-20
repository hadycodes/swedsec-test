import React, { useEffect, useRef } from "react";
import styles from "./GitGrid.module.css";
import { Affix, Space, Typography } from "antd";
import { RootState } from "src/store";
import Loader from "src/components/common/Loader";
import { useGetUserQuery } from "src/store/slices/api/users";

type Threshold = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

export type GridProps = {
  fetchNext: () => void;
  hasNext: boolean;
  isLoading: boolean;
  threshold: Threshold;
} & React.HTMLAttributes<HTMLDivElement>;

const GitGrid = (props: GridProps & React.PropsWithChildren) => {
  var gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      event.stopPropagation();
      const grid = gridRef.current;
      if (grid) {
        const { target } = event;
        const { documentElement } = target as Document;
        const {
          scrollTop: documentElementScrollTop,
          scrollHeight: documentElementScrollHeight,
          clientHeight,
        } = documentElement;
        const percent =
          documentElementScrollTop /
          (documentElementScrollHeight - clientHeight);

        if (
          percent > props.threshold &&
          props.hasNext &&
          props.isLoading == false
        ) {
          // remove scroll event.
          window.removeEventListener("scroll", handleScroll);

          //to avoid race condition
          setTimeout(props.fetchNext, 0);
        }
      }
    };

    if (props.hasNext) {
      window.addEventListener("scroll", handleScroll);
    }

    //used for cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.fetchNext, props.hasNext]);

  return (
    <Space direction="vertical" align="center">
      <div ref={gridRef} className={styles.grid} style={props.style}>
        {props.children}
      </div>
      {props.isLoading && (
        <Affix offsetBottom={100}>
          <Loader />
        </Affix>
      )}
      {!props.hasNext && <Typography.Text>No More :(</Typography.Text>}
    </Space>
  );
};

export default GitGrid;
