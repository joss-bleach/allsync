interface ChannelMessagesProps {
  name: string;
}

export const ChannelMessages = ({ name }: ChannelMessagesProps) => {
  return (
    <section className="flex h-full flex-1 flex-col justify-end py-4">
      <div className="flex flex-col py-2">
        <h1 className="text-[30px] font-medium text-[#2F3037]">
          Welcome to #{name}
        </h1>
        <p className="text-[13px] text-[#5E5F6E]">
          This is the start of the #MyChannel channel. Drop a message and say
          hello!
        </p>
      </div>
    </section>
  );
};
