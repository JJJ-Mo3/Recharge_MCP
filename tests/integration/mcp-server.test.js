import { RechargeServer } from '../../index.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

// Mock the MCP SDK
jest.mock('@modelcontextprotocol/sdk/server/index.js');
jest.mock('@modelcontextprotocol/sdk/server/stdio.js');

describe('RechargeServer Integration', () => {
  let server;
  let mockMCPServer;

  beforeEach(() => {
    mockMCPServer = {
      setRequestHandler: jest.fn(),
      onerror: null,
      connect: jest.fn(),
      close: jest.fn()
    };

    Server.mockImplementation(() => mockMCPServer);
    server = new RechargeServer();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Server Initialization', () => {
    test('should initialize MCP server with correct config', () => {
      expect(Server).toHaveBeenCalledWith(
        {
          name: 'recharge-mcp-server',
          version: '1.1.0'
        },
        {
          capabilities: {
            tools: {}
          }
        }
      );
    });

    test('should set up request handlers', () => {
      expect(mockMCPServer.setRequestHandler).toHaveBeenCalledTimes(2);
    });
  });

  describe('Tool Registration', () => {
    test('should register all customer tools', () => {
      const listToolsCall = mockMCPServer.setRequestHandler.mock.calls.find(
        call => call[0].type === 'ListToolsRequest'
      );
      
      expect(listToolsCall).toBeDefined();
      
      // Test the handler
      const handler = listToolsCall[1];
      const result = handler();
      
      expect(result.tools).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'recharge_get_customers' }),
        expect.objectContaining({ name: 'recharge_get_customer' }),
        expect.objectContaining({ name: 'recharge_create_customer' }),
        expect.objectContaining({ name: 'recharge_update_customer' })
      ]));
    });

    test('should register all subscription tools', () => {
      const listToolsCall = mockMCPServer.setRequestHandler.mock.calls.find(
        call => call[0].type === 'ListToolsRequest'
      );
      
      const handler = listToolsCall[1];
      const result = handler();
      
      expect(result.tools).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'recharge_get_subscriptions' }),
        expect.objectContaining({ name: 'recharge_create_subscription' }),
        expect.objectContaining({ name: 'recharge_cancel_subscription' }),
        expect.objectContaining({ name: 'recharge_pause_subscription' })
      ]));
    });

    test('should register all charge tools', () => {
      const listToolsCall = mockMCPServer.setRequestHandler.mock.calls.find(
        call => call[0].type === 'ListToolsRequest'
      );
      
      const handler = listToolsCall[1];
      const result = handler();
      
      expect(result.tools).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'recharge_get_charges' }),
        expect.objectContaining({ name: 'recharge_skip_charge' }),
        expect.objectContaining({ name: 'recharge_process_charge' }),
        expect.objectContaining({ name: 'recharge_refund_charge' })
      ]));
    });
  });

  describe('Tool Execution', () => {
    test('should handle tool calls correctly', async () => {
      const callToolCall = mockMCPServer.setRequestHandler.mock.calls.find(
        call => call[0].type === 'CallToolRequest'
      );
      
      expect(callToolCall).toBeDefined();
      
      const handler = callToolCall[1];
      
      // Mock the tool handler
      server.toolHandlers.handleGetCustomers = jest.fn().mockResolvedValue({
        content: [{ type: 'text', text: '{"customers": []}' }]
      });

      const request = {
        params: {
          name: 'recharge_get_customers',
          arguments: { limit: 10 }
        }
      };

      const result = await handler(request);
      
      expect(server.toolHandlers.handleGetCustomers).toHaveBeenCalledWith({ limit: 10 });
      expect(result).toEqual({
        content: [{ type: 'text', text: '{"customers": []}' }]
      });
    });

    test('should handle unknown tools', async () => {
      const callToolCall = mockMCPServer.setRequestHandler.mock.calls.find(
        call => call[0].type === 'CallToolRequest'
      );
      
      const handler = callToolCall[1];
      
      const request = {
        params: {
          name: 'unknown_tool',
          arguments: {}
        }
      };

      const result = await handler(request);
      
      expect(result).toEqual({
        content: [{ type: 'text', text: 'Error executing unknown_tool: Unknown tool: unknown_tool' }],
        isError: true
      });
    });
  });
});